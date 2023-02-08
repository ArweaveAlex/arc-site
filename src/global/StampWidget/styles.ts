import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';
import { open, fadeIn2 } from 'helpers/animations';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const WidgetContainer = styled.div`
	height: 60px;
	width: 215px;
	padding: 10px 30px 10px 15px;
	animation: ${open} ${fadeIn2};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
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
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
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

export const LoadingContainer = styled.div`
	height: 60px;
	width: 215px;
	position: relative;
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const WalletConnectWrapper = styled.div`
	height: 140px;
	width: 300px;
	max-width: 95vw;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	animation: ${open} ${fadeIn2};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
