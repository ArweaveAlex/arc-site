import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	svg {
		margin: 0 0 5px 0;
	}
	button {
		margin: 7.5px 0 0 0;
	}
`;

export const Container = styled.div``;

export const Dropdown = styled.ul<{ openDown: boolean; height: number }>`
	width: 225px;
	padding: 10px 0;
	position: absolute;
	top: ${(props) => (props.openDown ? `26.5px` : `-${props.height.toString()}px`)};
	right: 45%;
	z-index: 1;
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadiusField};
`;

export const LI = styled.li<{ disabled: boolean }>`
	pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
	text-align: center;
	height: 32.5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 13px;
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border: 1px solid ${(props) => (props.disabled ? props.theme.colors.button.alt2.disabled.border : props.theme.colors.transparent)};
	background: ${(props) => (props.disabled ? props.theme.colors.button.alt2.disabled.background : props.theme.colors.button.alt2.background)};
	padding: 0 15px;
	&:hover {
		background: ${(props) =>
			props.disabled ? props.theme.colors.button.alt2.disabled.background : props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;
