import styled from 'styled-components/macro';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
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
	box-shadow: 0 0 5px ${(props) => props.theme.colors.shadow.alt1};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	animation: ${open} ${fadeIn2};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
