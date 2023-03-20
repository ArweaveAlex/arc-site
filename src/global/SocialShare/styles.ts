import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const Info = styled.div<{ alt1: boolean }>`
	display: flex;
	margin: ${(props) => (props.alt1 ? '0px 5px 0 0' : '5.5px 5px 0 0')};
	p {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-size: ${(props) => (props.alt1 ? '12px' : props.theme.typography.size.xSmall)};
	}
	svg {
		fill: ${(props) => props.theme.colors.font.primary.alt7};
		width: 12.5px;
		margin: -1.75px 10px 0 0;
	}
`;

export const Actions = styled.div`
	display: flex;
	position: relative;
	> * {
		margin: 0 0 0 10px;
	}
`;

export const Icon = styled.div<{ alt1: boolean }>`
	height: 32.5px;
	width: 32.5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => (props.alt1 ? props.theme.colors.transparent : props.theme.colors.button.alt1.background)};
	border-radius: ${STYLING.dimensions.borderRadiusField};
	&:hover {
		background: ${(props) => (props.alt1 ? props.theme.colors.transparent : props.theme.colors.button.alt1.hover)};
		cursor: pointer;
		svg {
			opacity: ${(props) => (props.alt1 ? '0.75' : '1')};
		}
	}

	svg {
		height: 17.5px;
		width: 17.5px;
		fill: ${(props) => (props.alt1 ? props.theme.colors.icon.alt1.fill : props.theme.colors.button.alt1.label)};
	}
`;

export const URLCopied = styled.div`
	position: absolute;
	bottom: 100%;
	right: 90%;
	z-index: 5;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 6.5px 15px 5px 15px;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
	}
`;
