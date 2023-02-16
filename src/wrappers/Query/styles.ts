import styled from 'styled-components/macro';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const InvalidWrapper = styled.div`
	height: 75px;
	width: 300px;
	max-width: 95vw;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.alt1};
	display: flex;
	margin: auto;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	animation: ${open} ${fadeIn2};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;
