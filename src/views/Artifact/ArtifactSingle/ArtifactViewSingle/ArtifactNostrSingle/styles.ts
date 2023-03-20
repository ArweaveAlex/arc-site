import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    display: flex;
    width: ${STYLING.dimensions.listWidth};
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
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	z-index: 3;
`;
