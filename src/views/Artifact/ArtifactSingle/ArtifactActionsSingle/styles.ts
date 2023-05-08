import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
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
		margin: 20px 0 0 0;
		padding: 0;
	}
`;

export const ButtonsContainer = styled.div`
	height: 100%;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		top: auto;
		right: auto;
		transform: translate(0, 0);
		margin: 0 0 0 auto;
		flex-wrap: wrap;
		gap: 20px;
	}
`;

export const ButtonContainer = styled.div`
	position: relative;
	display: flex;
	margin: 0 20px 0 0;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
`;

export const WidgetContainer = styled.div`
	position: absolute;
	z-index: 1;
	&:after {
		display: block;
		content: ' ';
		position: absolute;
		top: 10.5px;
		right: 100%;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.border.primary}
			${(props) => props.theme.colors.transparent} ${(props) => props.theme.colors.transparent};
	}
`;

export const StampWidgetContainer = styled(WidgetContainer)`
	left: 100px;
`;

export const FactWidgetContainer = styled(WidgetContainer)`
	left: 110px;
`;

export const MobileWidget = styled.div`
	width: fit-content;
	margin: 0 auto;
	position: relative;
`;
