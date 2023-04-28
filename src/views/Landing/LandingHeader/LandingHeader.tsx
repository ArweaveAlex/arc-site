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
					<div>
						<h1>{LANGUAGE.siteTitle}</h1>
						<p>{LANGUAGE.banner.header1}</p>
					</div>
					<S.SubheaderWrapper>
						<S.SubheaderContainer>
							<S.FlexSubheader>
								<p>{LANGUAGE.banner.subheader1}</p>
								<S.Logo>
									<ReactSVG src={ASSETS.logo} />
								</S.Logo>
							</S.FlexSubheader>
							<div>
								<p>
									{LANGUAGE.banner.subheader2}&nbsp;
									<a target={'_blank'} href={OPERATOR_REDIRECT} rel={'noreferrer'}>
										{LANGUAGE.poolOperator}
									</a>
								</p>
							</div>
						</S.SubheaderContainer>
					</S.SubheaderWrapper>
				</S.FlexHeader>
				<S.GraphicWrapper>
					<ReactSVG src={ASSETS.landingGraphic} />
				</S.GraphicWrapper>
			</S.HeaderWrapper>
		</div>
	);
}
