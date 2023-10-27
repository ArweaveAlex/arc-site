import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { formatAddress, formatDate } from 'arcframework';

import { Tabs } from 'components/molecules/Tabs';
import { SocialShare } from 'components/organisms/SocialShare';
import { ARTIFACT_TABS, ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { formatArtifactType } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactHeaderSingle(props: IProps) {
	return props.data && props.type ? (
		<S.Wrapper>
			<S.HeaderWrapper>
				<h2>{props.data.ansTitle}</h2>
			</S.HeaderWrapper>
			<S.ContentWrapper>
				<S.Content>
					<S.Info>
						<S.InfoType>
							<>
								<ReactSVG src={props.type.icon} />
								<p>{formatArtifactType(props.type.label)}</p>
							</>
						</S.InfoType>
						<S.InfoMintDate>
							<>
								<ReactSVG src={ASSETS.mint} />
								<p>{formatDate(props.data.minted, 'epoch')}</p>
							</>
						</S.InfoMintDate>
						<S.InfoOwner>
							<>
								<ReactSVG src={ASSETS.owner} />
								<Link to={`${urls.libraryAll(props.data.owner!)}`}>{formatAddress(props.data.owner, false)}</Link>
							</>
						</S.InfoOwner>
						<S.InfoPool>
							<>
								<ReactSVG src={ASSETS.pool} />
								<Link to={`${urls.pool}${props.data.poolId}`}>{props.data.poolName}</Link>
							</>
						</S.InfoPool>
					</S.Info>
					<S.Divider />
					<S.Body>
						<Tabs onTabPropClick={(label: string) => props.onTabPropClick(label)}>
							{ARTIFACT_TABS.map((tab: { label: string }, index: number) => {
								return <S.TabWrapper key={index} label={tab.label} />;
							})}
						</Tabs>
						<SocialShare type={'alt1'} href={window.location.href} title={language.shareArtifact} />
					</S.Body>
				</S.Content>
			</S.ContentWrapper>
		</S.Wrapper>
	) : null;
}
