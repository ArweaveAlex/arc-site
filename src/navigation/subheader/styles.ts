import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: ${STYLING.dimensions.navHeight};
	width: 100%;
	position: fixed;
	top: ${STYLING.dimensions.navHeight};
	z-index: 4;
	background: ${(props) => props.theme.colors.navigation.header.background};
`;

export const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: ${STYLING.cutoffs.max};
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		justify-content: flex-end;
	}
`;

export const Node = styled.button<{ active: boolean }>`
	margin: 0 25px;
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.regular};
	padding: 0 0 2.5px 0;

	border-bottom: ${(props) =>
		props.active
			? `2px solid ${props.theme.colors.tabs.alt1.active}`
			: `2px solid ${props.theme.colors.tabs.inactive}`};
	color: ${(props) =>
		props.active ? props.theme.colors.font.primary.active.base : props.theme.colors.font.primary.alt1};
	border-bottom: ${(props) =>
		props.active
			? `2px solid ${props.theme.colors.tabs.alt1.active}`
			: `2px solid ${props.theme.colors.tabs.inactive}`};
	cursor: pointer;
	background: ${(props) => (props.active ? props.theme.colors.tabs.inactive : props.theme.colors.tabs.inactive)};

	&:hover {
		border-bottom: 2px solid ${(props) => props.theme.colors.tabs.alt1.active};
		background: ${(props) => props.theme.colors.tabs.inactive};
		color: ${(props) => props.theme.colors.font.primary.active.base};
	}
`;
