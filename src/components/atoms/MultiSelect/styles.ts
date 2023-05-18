import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	position: relative;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		max-width: none;
	}
`;

export const Label = styled.label`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	color: ${(props) => props.theme.colors.font.primary.alt1};
`;

export const Options = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0 0 0;
	gap: 15px;
`;

export const Option = styled.button<{ active: boolean }>`
	text-align: center;
	height: 32.5px;
	width: fit-content;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-radius: 25px;
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0 15px;
	background: ${(props) =>
		props.active ? props.theme.colors.button.alt2.active.background : props.theme.colors.button.alt2.background};
	color: ${(props) => (props.active ? props.theme.colors.font.primary.base : props.theme.colors.font.primary.alt1)};
	font-size: 13px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
	&:hover {
		background: ${(props) => props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const ErrorContainer = styled.div`
	margin: 7.5px 0 0 0;
	height: 25px;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const Error = styled.span`
	font-size: ${(props) => props.theme.typography.size.xxSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border-left: 3.5px solid ${(props) => props.theme.colors.font.primary.invalid};
	padding-left: 5px;
`;
