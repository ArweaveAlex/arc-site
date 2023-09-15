import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
`;

export const Label = styled.label`
	font-size: ${(props) => props.theme.typography.size.xSmall};
	color: ${(props) => props.theme.colors.font.primary.alt1};
`;

export const Action = styled.div``;

export const Select = styled.select`
	width: 100%;
	pointer-events: ${(props) => (props.disabled ? `none` : `all`)};
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	margin: 5px auto;
	box-sizing: border-box;
	background-color: ${(props) => props.theme.colors.form.alt1.background};
	border: 1px solid ${(props) => props.theme.colors.form.alt1.border};
	border-radius: 25px;
	padding: 10px 15px;
	color: ${(props) =>
		props.disabled ? props.theme.colors.font.primary.invalid : props.theme.colors.font.primary.alt1};
	position: relative;

	&:hover {
		cursor: pointer;
		background-color: ${(props) => props.theme.colors.form.alt1.hover};
	}

	&:focus {
		outline: 0;
		background-color: ${(props) => props.theme.colors.form.alt1.hover};
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: 40px;
	}
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
	background-position: 100%;
	background-repeat: no-repeat;
`;
