import { Link } from 'react-router-dom';

import { language } from 'helpers/language';
import { SOCIAL_PATHS } from 'helpers/paths';
import * as urls from 'helpers/urls';

import * as S from './styles';

export default function Footer() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>{`${language.siteTitle} ${new Date().getFullYear()}`}</S.Content>
				<S.EndContainer>
					<Link to={urls.blog}>{language.social.blog}</Link>
					{SOCIAL_PATHS.map((path, index) => (
						<a key={index} target={'_blank'} rel={'noreferrer'} href={path.href}>
							{path.name}
						</a>
					))}
				</S.EndContainer>
			</S.Container>
		</S.Wrapper>
	);
}
