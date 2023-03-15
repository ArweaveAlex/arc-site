import styled from 'styled-components';

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
		margin: 20px 0 0 0;
		padding: 0;
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
		flex-wrap: wrap;
		gap: 20px;
	}
`;

export const ButtonContainer = styled.div`
	margin: 0 0 0 20px;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		margin: 0;
	}
`;

export const WidgetContainer = styled.div`
	position: absolute;
	right: 100px;
`;

export const StampWidgetContainer = styled(WidgetContainer)`
	right: 228.5px;
`;

export const FactWidgetContainer = styled(WidgetContainer)``;
