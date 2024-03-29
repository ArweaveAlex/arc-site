import { ButtonLink } from 'components/atoms/ButtonLink';
import { SocialShare } from 'components/organisms/SocialShare';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';

export default function PoolsHeader() {
	return (
		<S.HeaderWrapper>
			<S.HeaderContent>
				<h2>{language.pools.header1}</h2>
				<S.Actions>
					<SocialShare type={'primary'} href={window.location.href} title={language.sharePools} />
					<S.CreateAction>
						<ButtonLink
							type={'alt2'}
							active
							label={language.createPool}
							href={urls.poolsCreate}
							height={52.5}
							width={275}
						/>
					</S.CreateAction>
				</S.Actions>
			</S.HeaderContent>
		</S.HeaderWrapper>
	);
}
