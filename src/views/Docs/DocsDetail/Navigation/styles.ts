import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const NWrapper = styled.div`
	height: 100%;
	width: 250px;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	backdrop-filter: blur(2px);
	animation: ${open} ${fadeIn2};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
		margin: 0 0 20px 0;
	}
`;

export const NContent = styled.div`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
	border-right: 1px solid ${(props) => props.theme.colors.border.primary};
	border-left: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const NTitle = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const NTitleMobile = styled.button`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	background: ${(props) => props.theme.colors.container.alt6.background};
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
	border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
	border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
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
	p {
		font-size: ${(props) => props.theme.typography.size.xSmall} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		color: ${(props) => props.theme.colors.font.primary.alt1} !important;
	}
`;

export const NList = styled.ul`
	height: calc(100% - 50px);
	width: 100%;
	overflow: auto;
	a {
		text-decoration: none;
	}
	> * {
		&:last-child {
			border-bottom: none;
		}
	}
`;

export const NListItem = styled.li<{ disabled: boolean }>`
	pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
	text-align: center;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 13px;
	line-height: 1.35;
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	border-bottom: 1px solid
		${(props) => (props.disabled ? props.theme.colors.button.alt2.disabled.border : props.theme.colors.border.primary)};
	background: ${(props) =>
		props.disabled ? props.theme.colors.button.alt2.disabled.background : props.theme.colors.button.alt2.background};
	padding: 10px 15px;
	&:hover {
		background: ${(props) =>
			props.disabled
				? props.theme.colors.button.alt2.disabled.background
				: props.theme.colors.button.alt2.active.background};
		color: ${(props) => props.theme.colors.font.primary.base};
	}
`;

export const NSubHeader = styled(NTitle)`
	height: auto;
	justify-content: flex-start;
	padding: 10px 15px;
`;

export const NSubList = styled.div``;
