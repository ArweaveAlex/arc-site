import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: calc(100% - 40px);
	position: fixed;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	z-index: 4;
	height: 100px;
	top: calc(${STYLING.dimensions.navHeight} + 100px);
	background: ${(props) => props.theme.colors.view.background};
    display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
        margin: 25px 0 0 0;
	}
`;

export const StampWidgetContainer = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    @media (max-width: ${STYLING.cutoffs.initial}) {
		position: relative;
		top: auto;
        right: auto;
        transform: translate(0,0);
        margin: 0 0 0 auto;
	}
`;