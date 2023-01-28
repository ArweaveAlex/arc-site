import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";
import { open, fadeIn2 } from "helpers/animations";

const THREAD_WIDTH = "600px";

export const Wrapper = styled.div`
    display: flex;
    width: ${THREAD_WIDTH};
    max-width: 90vw;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
    @media(max-width: ${THREAD_WIDTH}) {
        width: auto;
    }
`;

export const DetailWrapper = styled.div`
    min-height: 141.5px;
    width: 100%;
    position: relative;
    animation: ${open} ${fadeIn2};
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
    z-index: 3;
`;