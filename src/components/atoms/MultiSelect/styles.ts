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

export const Input = styled.div`
	height: ${STYLING.dimensions.formHeightSm};
	background-color: ${(props) => props.theme.colors.form.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.form.alt1.border};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-sizing: border-box;
	border-radius: 25px;
	padding: 10px;
	margin: 7.5px 0 0 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
	background-position: 100%;
	background-repeat: no-repeat;
	cursor: pointer;
	// &:hover {
	// 	background-color: ${(props) => props.theme.colors.form.alt1.hover};
	// }
`;

export const Options = styled.div`
	width: 98.5%;
	position: absolute;
	top: 72.5px;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusField};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
`;

export const Option = styled.button<{ active: boolean }>`
	text-align: center;
	height: 32.5px;
	width: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0 15px;
	background: ${(props) =>
		props.active ? props.theme.colors.button.alt2.active.background : props.theme.colors.button.alt2.background};
	color: ${(props) => (props.active ? props.theme.colors.font.primary.base : props.theme.colors.font.primary.alt1)};
	font-size: 13px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border: 1px solid ${(props) => props.theme.colors.transparent};
	&:hover {
		background: ${(props) => props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const ValuesMap = styled.div`
	display: flex;
	max-width: 90%;
	overflow-x: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		padding: 0;
	}
`;

export const Value = styled.div`
	height: 30.5px;
	width: fit-content;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-radius: 25px;
	background: ${(props) => props.theme.colors.container.alt4.background};
	margin: 0 10px 0 0;
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		margin: 0 10.5px 0 0;
	}
	button {
		margin: 0;
		padding: 1.5px 0 0 0;
		svg {
			height: 12.5px !important;
			width: 12.5px !important;
		}
	}
`;

export const Display = styled.div`
	p {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
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
