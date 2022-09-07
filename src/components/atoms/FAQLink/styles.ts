import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 135px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
        padding: 10px 0 0 0;
    }
`;

export const Content = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    animation: ${open} ${fadeIn2};
`;

export const HeaderContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const H2 = styled.h2`
    line-height: 1.25;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 24px;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        font-size: 5vw;
    }
`;

export const Header1 = styled(H2)`
    color: ${(props) => props.theme.colors.font.primary.active.base};
`;

export const Header2 = styled(Header1)`
    font-weight: ${(props) => props.theme.typography.weight.bold};
`;

export const Header3 = styled.a`
    color: ${(props) => props.theme.colors.font.secondary.base};
    font-size: ${(props) => props.theme.typography.size.h2};
    text-decoration: underline;
    line-height: 1.25;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 24px;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        font-size: 5vw;
    }
    &:hover {
        opacity: 0.85;
    }
`;

export const Flex = styled.div`
    display: flex;
    margin: 5px 0;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-direction: column;
        margin: 0 0 20px 0;
    }
`;
