import styled from "styled-components/macro";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    animation: ${open} ${fadeIn2};
    padding: 20px 20px 0 20px;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
    }
`;

export const HeaderFlex = styled.div`
    display: flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: fit-content;
        flex-direction: column;
        margin: 0 0 20px 0;
    }
`;

export const H2 = styled.h2`
    font-size: 28px;
    line-height: 1.25;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 24px;
    }
`;

export const Header1 = styled(H2)`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-family: ${(props) => props.theme.typography.family.alt1};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        margin: 0 0 20px 0;
    }
`;