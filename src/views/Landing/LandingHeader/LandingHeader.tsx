import { ReactSVG } from 'react-svg';

import { ASSETS, OPERATOR_LINK } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as S from './styles';

export default function LandingHeader() {
	return (
		<S.Wrapper>
			<S.Content>
				<S.HeaderWrapper>
					<S.FlexHeader>
						<S.Header3>{LANGUAGE.companyTitle}</S.Header3>
						&nbsp; &nbsp;
						<S.Header2Container>
							<S.Header2>{LANGUAGE.banner.header1}</S.Header2>
							<S.Highlight />
						</S.Header2Container>
						&nbsp; &nbsp;
						<S.Header1>{LANGUAGE.banner.header2}</S.Header1>
					</S.FlexHeader>
				</S.HeaderWrapper>
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
								<a target={'_blank'} href={OPERATOR_LINK} rel={'noreferrer'}>
									{LANGUAGE.poolOperator}
								</a>
							</S.Link>
						</S.Subheader2>
					</S.SubheaderContainer>
				</S.SubheaderWrapper>
			</S.Content>
		</S.Wrapper>
	);
}
