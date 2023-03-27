import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	padding: 0 20px 20px 20px;
	width: 100%;
	animation: ${open} ${fadeIn2};
	margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	margin: calc(${STYLING.dimensions.navHeight} + 130px) auto 0 auto;
	display: flex;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
		margin: 40px auto 0 auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		flex-direction: column;
		margin: 40px auto 0 auto;
	}
`;

export const ArtifactsWrapper = styled.div`
	width: calc(100% - 400px);
	padding: 0 10px 0 0;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 0 0 40px 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: 100%;
		margin: 0 0 40px 0;
	}
`;

export const FormWrapper = styled.div`
	position: relative;
	width: 350px;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: 100%;
	}
`;
