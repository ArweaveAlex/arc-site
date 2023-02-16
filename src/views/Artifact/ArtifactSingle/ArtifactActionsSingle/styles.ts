import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: calc(100% - 40px);
	position: fixed;
	max-width: calc(${STYLING.cutoffs.max} - 40px);
	z-index: 4;
	height: 50px;
	top: calc(${STYLING.dimensions.navHeight} + 100px);
	background: ${(props) => props.theme.colors.view.background};
    border: 1px solid red;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		height: auto;
		width: 100%;
		position: relative;
		top: auto;
	}
`;