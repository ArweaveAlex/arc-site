import styled from 'styled-components';

import { open, fadeIn2 } from 'helpers/animations';
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
	@media (max-width: ${STYLING.cutoffs.initialWrapper}) {
		height: auto;
	}
`;

export const HeaderContent = styled.div`
	position: absolute;
`;

export const HeaderContentFixed = styled.div`
	width: calc(100% - 40px);
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	background: ${(props) => props.theme.colors.container.primary.background};
	margin: 0 0 40px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	position: fixed;
	z-index: 2;
	top: ${STYLING.dimensions.navHeight};
	left: 50%;
	transform: translate(-50%, 0);
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const Header1Wrapper = styled.div`
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 20px;
	margin: 20px 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		border: none;
		box-shadow: none;
	}
`;

export const H2 = styled.h2`
	font-size: 28px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Header1 = styled(H2)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	margin: calc(${STYLING.dimensions.navHeight} + 125px) auto 0 auto;
	display: flex;
	justify-content: space-between;
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

export const FormHeader = styled.div`
	margin: 0 0 35px 0;
	h2 {
		font-size: 28px;
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		h2 {
			font-size: 24px;
		}
	}
`;

export const Form = styled.form``;

export const SubmitContainer = styled.div`
	width: fit-content;
	margin: 0 0 0 auto;
	// position: fixed;
	// bottom: 20px;
	// right: 20px;
	// @media (max-width: ${STYLING.cutoffs.initial}) {
	// 	position: relative;
	// 	bottom: auto;
	// 	right: auto;
	// }
	// @media(max-height: ${STYLING.cutoffs.mobileLandscape}) {
	//     position: relative;
	// 	bottom: auto;
	// 	right: auto;
	// }
`;

export const ActionContainer = styled.div`
	display: flex;
	> * {
		&:last-child {
			margin: 0 0 0 20px;
		}
	}
`;

export const ActionButtonContainer = styled.div``;
