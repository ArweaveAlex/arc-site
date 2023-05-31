import { ButtonLink } from 'components/atoms/ButtonLink';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';

export default function PoolsHeader() {
	return (
		<S.HeaderWrapper>
			<S.HeaderContent>
				<h2>{language.createPool}</h2>
				<ButtonLink type={'primary'} label={language.learnAboutCreating} href={urls.create} height={52.5} width={275} />
			</S.HeaderContent>
		</S.HeaderWrapper>
	);
}
