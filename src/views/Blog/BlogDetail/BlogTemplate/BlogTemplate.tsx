import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';

import * as S from './styles';

function CodeBlock({ children }: { children: React.ReactNode }): React.ReactElement {
	const codeRef = React.useRef<HTMLPreElement>(null);

	const [copied, setCopied] = React.useState<boolean>(false);

	const handleCopyClick = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (codeRef.current) {
			const range = document.createRange();
			range.selectNode(codeRef.current);
			window.getSelection()?.removeAllRanges();
			window.getSelection()?.addRange(range);
			document.execCommand('copy');
			window.getSelection()?.removeAllRanges();
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<S.CodeBlock>
			<pre ref={codeRef}>{children}</pre>
			<S.CopyIcon
				onClick={(e: any) => handleCopyClick(e)}
				dimensions={{
					wrapper: 22.5,
					icon: 12.5,
				}}
			>
				<ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
			</S.CopyIcon>
		</S.CodeBlock>
	);
}

export default function BlogTemplate(props: { blog?: string; id?: string }) {
	const [markdown, setMarkdown] = React.useState<string>('');

	const navigate = useNavigate();
	const location = useLocation();
	const basePath = urls.blog;
	const active = location.pathname.replace(basePath, '');

	const [hashState, setHashState] = React.useState(window.location.href);

	React.useEffect(() => {
		const handleHashChange = () => {
			setHashState(window.location.href);
		};

		window.addEventListener('popstate', handleHashChange);

		return () => {
			window.removeEventListener('popstate', handleHashChange);
		};
	}, []);

	React.useEffect(() => {
		if (props.id) {
			setHashState(props.id);
		}
	}, [props]);

	React.useEffect(() => {
		const observer = new MutationObserver((mutationsList, observer) => {
			for (let mutation of mutationsList) {
				if (mutation.addedNodes.length) {
					let hash = hashState.substring(hashState.indexOf('#') + 1);
					hash = hash.substring(hash.indexOf('#') + 1);

					if (hash) {
						const targetElement = document.getElementById(hash);
						if (targetElement) {
							targetElement.scrollIntoView();
							observer.disconnect();
							break;
						}
					}
				}
			}
		});

		observer.observe(document, { childList: true, subtree: true });
		return () => observer.disconnect();
	}, [hashState]);

	React.useEffect(() => {
		let hash = hashState.substring(hashState.indexOf('#') + 1);
		hash = hash.substring(hash.indexOf('#') + 1);

		if (hash) {
			const targetElement = document.getElementById(hash);
			if (targetElement) {
				targetElement.scrollIntoView();
			}
		}
	}, [hashState]);

	React.useEffect(() => {
		if (props.blog) {
			import(`../MD/${props.blog}.md`)
				.then((module) => setMarkdown(module.default))
				.catch((error) => console.error('Error fetching markdown: ', error));
		} else {
			if (!active) {
				navigate(`${urls.blog}introduction`);
			} else {
				import(`../MD/${active}.md`)
					.then((module) => setMarkdown(module.default))
					.catch((error) => console.error('Error fetching markdown: ', error));
			}
		}
	}, [active]);

	const renderers = {
		h2: (props: any) => {
			const { level, children } = props;
			let id: any;
			if (children && children[0] && children[0].props) {
				let hash = children[0].props.href.substring(children[0].props.href.indexOf('#') + 1);
				hash = hash.substring(hash.indexOf('#') + 1);
				id = hash;
			}
			if (level === 2 && id) {
				return <h2 id={id}>{children}</h2>;
			} else {
				return <h2>{children}</h2>;
			}
		},
		link: (props: any) => {
			const { href, children } = props;
			const isAnchorLink = href && href.startsWith('#');

			if (isAnchorLink) {
				return (
					<Link {...props} to={href}>
						{children}
					</Link>
				);
			}

			return (
				<a {...props} href={href}>
					{children}
				</a>
			);
		},
	};

	return markdown ? (
		<S.Wrapper isView={!props.blog}>
			<ReactMarkdown
				children={markdown}
				components={{
					code: CodeBlock,
					link: renderers.link,
					h2: renderers.h2,
				}}
			/>
		</S.Wrapper>
	) : (
		<Loader />
	);
}
