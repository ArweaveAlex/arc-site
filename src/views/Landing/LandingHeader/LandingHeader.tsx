import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function LandingHeader() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.HeaderWrapper>
				<S.FlexHeader>
					<div>
						<h1>{language.siteTitle}</h1>
						<p>{language.banner.header1}</p>
					</div>
					<S.SubheaderWrapper>
						<S.SubheaderContainer>
							<S.FlexSubheader>
								<p>{language.banner.subheader1}</p>
								<S.Logo>
									<ReactSVG src={ASSETS.logo} />
								</S.Logo>
							</S.FlexSubheader>
							<div>
								<p>
									{language.banner.subheader2}&nbsp;
									<Link
										to="https://frab5l3bxo4stup53rnpf6y2esgjm6uqud6m5ef5toq3ucizg3rq.arweave.net/LEAer2G7uSnR_dxa8vsaJIyWepCg_M6QvZuhugkZNuM"
										target="_blank"
									>
										here.
									</Link>
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
