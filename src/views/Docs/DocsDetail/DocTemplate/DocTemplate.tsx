import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';

import * as S from './styles';

// TODO: Next - Prev links
// TODO: Breadcrumbs

function CodeBlock({ children }: { children: React.ReactNode }): React.ReactElement {
	const codeRef = React.useRef<HTMLPreElement>(null);

	const [copied, setCopied] = React.useState<boolean>(false);

	const handleCopyClick = () => {
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
			<IconButton
				sm
				type={'alt1'}
				src={copied ? ASSETS.checkmark : ASSETS.copy}
				handlePress={handleCopyClick}
				dimensions={{
					wrapper: 22.5,
					icon: 12.5,
				}}
			/>
		</S.CodeBlock>
	);
}

export default function DocTemplate() {
	const [markdown, setMarkdown] = React.useState<string>('');

	const navigate = useNavigate();
	const location = useLocation();
	const basePath = urls.docs;
	const active = location.pathname.replace(basePath, '');

	React.useEffect(() => {
		if (!active) {
			navigate(`${urls.docs}introduction`);
		} else {
			import(`../MD/${active}.md`)
				.then((module) => setMarkdown(module.default))
				.catch((error) => console.error('Error fetching markdown: ', error));
		}
	}, [active]);

	return markdown ? (
		<S.Wrapper>
			<ReactMarkdown
				children={markdown}
				components={{
					code: CodeBlock,
				}}
			/>
		</S.Wrapper>
	) : (
		<Loader />
	);
}
