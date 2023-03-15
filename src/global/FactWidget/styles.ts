import styled from 'styled-components';

import { fadeIn1, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const WidgetContainer = styled.div`
	height: 60px;
	width: 215px;
	padding: 10px 15px;
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
	margin: auto;
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
