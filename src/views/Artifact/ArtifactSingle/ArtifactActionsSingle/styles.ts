import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: calc(100% - 40px);
	position: fixed;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	z-index: 4;
	height: 55px;
	padding: 20px 0 0 0;
	top: calc(${STYLING.dimensions.navHeight} + 100px);
	background: ${(props) => props.theme.colors.view.background};
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
	}
`;

export const ButtonsContainer = styled.div`
	height: 100%;
	display: flex;
	position: absolute;
	right: 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		top: auto;
		right: auto;
		transform: translate(0, 0);
		margin: 0 0 0 auto;
	}
`;

export const ButtonContainer = styled.div`
	margin: 0 0 0 20px;
`;

export const StampWidgetContainer = styled.div`
	position: absolute;
	right: 97.5px;
	&:after {
		content: ' ';
		position: absolute;
		top: 10.5px;
		left: 100%;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.transparent}
			${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.border.alt1};
	}
`;
