import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const WalletDropdown = styled.ul`
	width: 225px;
	padding: 10px 0;
	position: absolute;
	top: 55.5px;
	right: 18.5px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusField};

	@media (max-width: ${STYLING.cutoffs.initial}) {
		right: auto;
		left: 17.5px;
		top: 67.5px;
	}
	li {
		text-align: center;
		height: 32.5px;
		display: flex;
		align-items: center;
		cursor: pointer;
		font-size: 13px;
		font-weight: ${(props) => props.theme.typography.weight.medium};
		border: 1px solid ${(props) => props.theme.colors.transparent};
		padding: 0 15px;
		&:hover {
			background: ${(props) => props.theme.colors.button.alt2.active.background};
			color: ${(props) => props.theme.colors.font.primary.base};
		}
	}
`;
