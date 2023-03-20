import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.dimensions.listWidth}) {
        width: auto;
    }
`;

export const DetailWrapper = styled.div`
	height: 100%;
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	z-index: 3;
`;
