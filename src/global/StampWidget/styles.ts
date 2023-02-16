import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';
import { open, fadeIn1 } from 'helpers/animations';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const WidgetContainer = styled.div`
	height: 60px;
	width: 215px;
	padding: 10px 30px 10px 15px;
	animation: ${open} ${fadeIn1};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		margin: 0 !important;
	}
`;

export const Action = styled.div`
	margin: 0;
`;

export const Title = styled.div`
	width: fit-content;
	padding: 2.5px 10px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	p {
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		font-size: ${(props) => props.theme.typography.size.xxSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const SAContainer = styled.div`
	min-height: 100px;
	width: 300px;
	max-width: 55vw;
	padding: 20px;
	position: absolute;
	z-index: 2;
	top: -13.5px;
	right: 65%;
	display: flex;
	flex-direction: column;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	animation: ${open} ${fadeIn1};
	&:after {
		content: ' ';
		position: absolute;
		top: 37.5px;
		left: 100%;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.transparent}
			${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.border.primary};
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		right: 0;
		top: 58.5px;
		&:after {
			content: ' ';
			position: absolute;
			top: -10px;
			left: 50%;
			border-width: 5px;
			border-style: solid;
			border-color: ${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.transparent}
				${(props) => props.theme.colors.border.primary} ${(props) => props.theme.colors.transparent};
		}
	}
`;

export const SAInfoContainer = styled.div`
	height: 30px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SABalanceContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 7.5px 12.5px !important;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.alt4.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	svg {
		fill: ${(props) => props.theme.colors.font.primary.active.base} !important;
		width: 12.5px !important;
		margin: 2.5px 10px 0 0 !important;
	}
	p {
		max-width: 85%;
		font-family: ${(props) => props.theme.typography.family.primary} !important;
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.medium} !important;
		color: ${(props) => props.theme.colors.font.primary.active.base} !important;
		overflow: hidden;
		text-overflow: ellipsis;
		height: auto !important;
		margin: 0 !important;
	}
`;

export const SACloseContainer = styled.div``;

export const SAFormContainer = styled.form`
	height: calc(100% - 30px);
	width: 100%;
`;

export const SAInput = styled.div`
	width: 100%;
`;

export const SASubmit = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	button {
		margin: 0 !important;
	}
`;

export const LoadingContainer = styled.div`
	height: 60px;
	width: 215px;
	position: relative;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const WalletConnectWrapper = styled.div`
	height: 140px;
	width: 300px;
	max-width: 95vw;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	animation: ${open} ${fadeIn1};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
