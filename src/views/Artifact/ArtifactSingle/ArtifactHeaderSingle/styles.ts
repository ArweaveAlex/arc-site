import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: calc(100% - 40px);
	position: fixed;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	z-index: 4;
	height: 140px;
	top: ${STYLING.dimensions.navHeight};
	background: ${(props) => props.theme.colors.view.background};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
	}
`;

export const ContentWrapper = styled.div`
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

export const Content = styled.div`
	height: 100%;
	width: calc(100% - 110px);
	max-width: ${STYLING.cutoffs.max};
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	position: relative;
`;

export const Info = styled.div`
	height: 50%;
	width: 100%;
	padding: 0 25px;
	display: flex;
	position: relative;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		background: ${(props) => props.theme.colors.transparent};
		border: none;
		height: auto;
		flex-wrap: wrap;
		padding: 0;
		border-radius: 0;
	}
`;

export const InfoData = styled.div`
	height: 77.5%;
	width: calc(30.5% - 50px);
	width: 30%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto 0;
	padding: 0 12.5px;
	div,
	p,
	a {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
	p {
		line-height: 16px;
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 35px;
		width: fit-content !important;
		max-width: 100%;
		margin: 0 10px 10px 0;
		padding: 10px !important;
		border: 1px solid ${(props) => props.theme.colors.border.alt1} !important;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper} !important;
		background: ${(props) => props.theme.colors.container.alt6.background};
	}
`;

export const InfoStyled = styled(InfoData)`
	div,
	p,
	a {
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
	a {
		text-decoration: underline;
		&:hover {
			cursor: pointer;
			color: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
	svg {
		width: 25px;
		margin: 0 10px 0 0;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
	border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		border: none;
		svg {
			width: 17.5px;
		}
	}
`;

export const InfoTitle = styled(InfoData)`
	width: 27.5%;
	padding: 0 10px 0 0;
`;

export const InfoType = styled(InfoStyled)`
	width: 12.5%;
`;

export const InfoMintDate = styled(InfoStyled)`
	width: 25%;
`;

export const InfoOwner = styled(InfoStyled)`
	width: 15%;
`;

export const InfoPools = styled(InfoStyled)`
	width: 20%;
`;

export const Divider = styled.div`
	height: 1px;
	width: calc(100% - 50px);
	position: absolute;
	top: 52.5%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-top: 1px solid ${(props) => props.theme.colors.border.alt1};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const Body = styled.div`
	height: 46.5%;
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt6.background};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 25px;
	border-bottom-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-bottom-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 50px;
		margin: 0 auto;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		border: 1px solid ${(props) => props.theme.colors.border.alt1};
	}
`;

export const TabWrapper = styled.div<{ label: string }>``;
