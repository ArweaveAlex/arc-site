import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	max-width: ${STYLING.cutoffs.max}
	background: ${(props) => props.theme.colors.view.background};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
	}
`;

export const HeaderWrapper = styled.div`
	h2 {
		margin: 0 0 20px 0;
	}
`;

export const ContentWrapper = styled.div`
	height: 100px;
	width: 100%;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		position: relative;
		top: auto;
		transform: translate(0, 0);
	}
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		background: ${(props) => props.theme.colors.transparent};
		box-shadow: none;
		border-radius: 0;
	}
`;

export const Info = styled.div`
	height: 50%;
	width: 100%;
	padding: 0 25px;
	display: flex;
	position: relative;
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
		max-width: 195px;
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
		width: 20px;
		margin: 0 10px 0 0;
		fill: ${(props) => props.theme.colors.font.primary.active.base};
	}
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		background: ${(props) => props.theme.colors.container.alt4.background};
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		box-shadow: 0 2.5px 3.5px 0 ${(props) => props.theme.colors.shadow.primary};
		svg {
			width: 17.5px;
		}
	}
`;

export const InfoType = styled(InfoStyled)`
	width: 20%;
	border-left: none;
	padding: 0 10px 0 0;
	justify-content: flex-start;
`;

export const InfoMintDate = styled(InfoStyled)`
	width: 30%;
`;

export const InfoOwner = styled(InfoStyled)`
	width: 25%;
`;

export const InfoPool = styled(InfoStyled)`
	width: 25%;
	padding: 0 0 0 10px;
	justify-content: flex-end;
`;

export const Divider = styled.div`
	height: 1px;
	width: calc(100% - 50px);
	position: absolute;
	top: 52.5%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		display: none;
	}
`;

export const Body = styled.div`
	height: 50%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 25px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 50px;
		margin: 0 auto;
		border-radius: ${STYLING.dimensions.borderRadiusWrapper};
		border: 1px solid ${(props) => props.theme.colors.border.primary};
	}
`;

export const TabWrapper = styled.div<{ label: string }>``;
