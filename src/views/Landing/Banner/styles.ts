import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 200px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.secondary.background};
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
    height: 90%;
    width: 700px;
`;

export const H1 = styled.h1`
    font-size: 56px;
    line-height: 1.25;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 40px;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        font-size: 7.5vw;
    }
`;

export const Header1 = styled(H1)`
    color: ${(props) => props.theme.colors.font.primary.base};
`;

export const Header2 = styled(Header1)`
    position: relative;
    z-index: 1;
`;

export const Header2Container = styled.div`
    width: fit-content;
    position: relative;
`;

export const Header3 = styled(H1)`
    color: ${(props) => props.theme.colors.font.tertiary.base};
`;

export const FlexHeader = styled.div`
    display: flex;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-wrap: wrap;
    }
`;

export const Highlight = styled.div`
    height: 32.5px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.tertiary.background};
    position: absolute;
    bottom: 0;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: 17.5px;
    }
`;

export const SubheaderContainer = styled.div`
    height: 90%;
    width: calc(100% - 700px);
    padding: 10px 0px 10px 0;
`;

export const FlexSubheader = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;

export const Subheader1 = styled.p`
    font-size: 18px;
    color: ${(props) => props.theme.colors.font.quinary.base};
    font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const Logo = styled.div`
    margin: 0 0 0 10px;
    svg {
        width: 100px;
    }
`;

export const Subheader2 = styled.div`
    width: 95%;
    max-width: 460px;
    margin: 0 0 0 auto;
    text-align: right;
    p {
        font-size: 17px;
        line-height: 1.5;
        color: ${(props) => props.theme.colors.font.primary.base};
    }
`;