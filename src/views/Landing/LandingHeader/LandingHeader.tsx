import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { OPERATOR_REDIRECT } from 'helpers/paths';

import * as S from './styles';

export default function LandingHeader() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.HeaderWrapper>
				<S.FlexHeader>
					<h1>{LANGUAGE.siteTitle}</h1>
					<h2>
						{LANGUAGE.banner.header1} {LANGUAGE.banner.header2}
					</h2>
					<S.SubheaderWrapper>
						<S.SubheaderContainer>
							<S.FlexSubheader>
								<S.Subheader1>{LANGUAGE.banner.subheader1}</S.Subheader1>
								<S.Logo>
									<ReactSVG src={ASSETS.logo} />
								</S.Logo>
							</S.FlexSubheader>
							<S.Subheader2>
								<p>{LANGUAGE.banner.subheader2}&nbsp;</p>
								<S.Link>
									<a target={'_blank'} href={OPERATOR_REDIRECT} rel={'noreferrer'}>
										{LANGUAGE.poolOperator}
									</a>
								</S.Link>
							</S.Subheader2>
						</S.SubheaderContainer>
					</S.SubheaderWrapper>
				</S.FlexHeader>
				<S.GraphicWrapper>
					<img src={ASSETS.landingGraphic} />
				</S.GraphicWrapper>
			</S.HeaderWrapper>
		</div>
	);
}
