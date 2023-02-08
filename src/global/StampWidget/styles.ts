import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';
import { open, fadeIn2 } from 'helpers/animations';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export const WidgetContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    animation: ${open} ${fadeIn2};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
    button {
        margin: 0 !important;
    }
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

export const WalletConnectWrapper = styled.div`
	height: 140px;
	width: 300px;
	max-width: 95vw;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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