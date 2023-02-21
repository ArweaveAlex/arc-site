import styled from 'styled-components';

import { STYLING } from 'helpers/styling';
import { open, fadeIn2 } from 'helpers/animations';

export const Wrapper = styled.div`
    display: flex;
    width: 1125px;
    max-width: 90vw;
    margin: 0 auto;
    position: relative;
    padding: 20px 0;
    display flex;
    justify-content: space-between;
    @media(max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
        flex-direction: column-reverse;
    }
    @media(max-height: ${STYLING.cutoffs.mobileLandscape}) {
        flex-direction: column-reverse;
    }
`;

export const ListWrapper = styled.div`
	min-height: 100vh;
	width: ${STYLING.dimensions.threadWidth};
	max-width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 0 0 300px 0;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		width: ${STYLING.dimensions.wrapWidth};
		margin: 0 auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: ${STYLING.dimensions.wrapWidth};
		margin: 0 auto;
	}
`;

export const HDWrapper = styled.div`
	width: ${STYLING.dimensions.threadDetailWidth};
	position: absolute;
	right: 0;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		right: auto;
		margin: 0 auto 20px auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		right: auto;
		margin: 0 auto 20px auto;
	}
`;

export const HDContent = styled.div`
	height: 80vh;
	width: 500px;
	position: fixed;
	overflow-y: auto;

	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}

	overflow-x: hidden;
	top: calc(${STYLING.dimensions.navHeight} + 20px);

	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		height: auto;
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		top: auto;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		height: auto;
		width: ${STYLING.dimensions.wrapWidth};
		max-width: 100%;
		position: relative;
		top: auto;
	}
`;

export const HeaderWrapper = styled.div`
	min-height: 141.5px;
	width: 100%;
	position: relative;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	padding: 20px 20px 15px 20px;
	margin: 0 0 20px 0;
	a {
		font-size: 22px;
		font-weight: 500;
		white-space: nowrap;
		&:hover {
			text-decoration-thickness: 1.5px;
		}
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 25px)) {
		margin: 20px 0;
	}
	@media (max-height: ${STYLING.cutoffs.mobileLandscape}) {
		margin: 20px 0;
	}
`;

export const HeaderContent = styled.div`
	height: 100%;
	width: 100%;
	animation: ${open} ${fadeIn2};
`;

export const SubheaderFlex = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 0 0 0;
`;

export const SubheaderContainer = styled.div`
	display: flex;
	margin: 7.5px 0;
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

export const DetailWrapper = styled.div`
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	z-index: 3;
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
