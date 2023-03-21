import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	padding: 0 20px;
`;

export const HDWrapper = styled.div`
	width: calc(100% - 40px);
	position: fixed;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	z-index: 4;
	height: 100px;
	top: ${STYLING.dimensions.navHeight};
	left: 50%;
	transform: translate(-50%, 0);
	background: ${(props) => props.theme.colors.view.background};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
		left: auto;
		transform: translate(0, 0);
	}
`;

export const HDContentWrapper = styled.div`
	height: 100px;
	width: 100%;
	display: flex;
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		position: relative;
		top: auto;
		transform: translate(0, 0);
	}
`;

export const HDContent = styled.div`
	height: 100%;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		background: ${(props) => props.theme.colors.transparent};
		box-shadow: none;
		border-radius: 0;
	}
`;

export const HeaderWrapper = styled.div`
	min-height: 100px;
	height: 100%;
	width: 100%;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 20px 20px 15px 20px;
	a {
		font-size: 22px;
		font-weight: 500;
		line-height: 1.25;
		&:hover {
			text-decoration-thickness: 1.5px;
		}
	}
`;

export const HeaderContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const HContainer = styled.div``;

export const SubheaderFlex = styled.div`
	display: flex;
	margin: 10px 0 0 0;
`;

export const SubheaderContainer = styled.div`
	display: flex;
	margin: 0 7.5px 0 0;
	white-space: nowrap;
	overflow: hidden;
`;

export const Subheader1 = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		color: ${(props) => props.theme.colors.font.primary.alt6};
	}
`;

export const Subheader2 = styled.div`
	p,
	a {
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 20px;
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
`;

export const ID = styled(Subheader2)``;

export const ListWrapper = styled.div`
	height: 600px;
	width: 100%;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	margin: calc(${STYLING.dimensions.navHeight} + 120px) auto 0 auto;
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		margin: 20px 0 0 0;
	}
`;

export const LoadingContainerInit = styled.div`
	height: 100px;
	width: 100%;
	position: relative;
	margin: 20px 0 0 0;
`;

export const ActionContainer = styled.div`
	height: 42.5px;
	width: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	button {
		height: 100% !important;
		width: 100% !important;
		border: none !important;
		border-radius: 0;
	}
`;

export const TP = styled.div`
	height: 30px;
	width: 500px;
	max-width: 100%;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const DP = styled.div`
	height: 24.5px;
	width: 500px;
	max-width: 100%;
	margin: 10px 0 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;
