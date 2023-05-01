import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';

import * as urls from 'helpers/urls';

import * as S from './styles';

// TODO: Folder index with links
// TODO: Next - Prev links
// TODO: Breadcrumbs
// TODO: Copy code
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

	return (
		<S.Wrapper>
			<ReactMarkdown children={markdown} />
		</S.Wrapper>
	);
}
