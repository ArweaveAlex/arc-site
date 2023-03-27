import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

const WRAPPER_HEIGHT = '550px';

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
	margin: calc(${STYLING.dimensions.navHeight} + 125px) auto 0 auto;
	display: flex;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		flex-direction: column;
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

export const FormContainer = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		position: relative;
	}
`;

export const FormFixedContainer = styled.div`
	height: fit-content;
	max-height: calc(80vh - 65px);
	width: 350px;
	padding: 0 0 20px 0;
	position: fixed;
	overflow: auto;
	scrollbar-width: none;
	padding: 20px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-height: none;
		position: relative;
		width: 100%;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		position: relative;
		max-height: none;
		position: relative;
		width: 100%;
	}
`;

export const Form = styled.form`
	margin: -10px 0 0 0;

	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		margin: 0;
	}
`;

export const SubmitContainer = styled.div`
	width: fit-content;
	margin: 0 0 0 auto;
`;

export const LoadingContainer = styled.div`
	height: 100%;
	height: ${WRAPPER_HEIGHT};
	width: 100%;
	position: relative;
	margin: 40px 0 0 0;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;
