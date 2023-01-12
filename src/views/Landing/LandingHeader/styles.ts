import styled from "styled-components";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    height: 200px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.alt1.background};
    @media(max-width: ${STYLING.cutoffs.banner}) {
        height: auto;
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
    @media(max-width: ${STYLING.cutoffs.banner}) {
        flex-direction: column;
        align-items: start;
        padding: 35px 20px;
    }
`;

export const HeaderContainer = styled.div`
    height: 90%;
    width: 700px;
    @media(max-width: ${STYLING.cutoffs.banner}) {
        width: auto;
    }
`;

export const FlexHeader = styled.div`
    display: flex;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-wrap: wrap;
    }
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

export const Header2Container = styled.div`
    width: fit-content;
    position: relative;
`;

export const Header2 = styled(Header1)`
    position: relative;
    z-index: 1;
`;

export const Header3 = styled(H1)`
    color: ${(props) => props.theme.colors.font.primary.alt3};
`;

export const Highlight = styled.div`
    height: 32.5px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.alt2.background};
    position: absolute;
    bottom: 0;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: 17.5px;
    }
`;

export const SubheaderContainer = styled.div`
    height: 90%;
    width: calc(100% - 700px);
    min-width: 460px;
    padding: 10px 0;
    @media(max-width: ${STYLING.cutoffs.banner}) {
        width: auto;
        min-width: 0;
    }
`;

export const FlexSubheader = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    @media(max-width: ${STYLING.cutoffs.banner}) {
        justify-content: start;
    }
`;

export const Subheader1 = styled.p`
    font-size: 18px;
    color: ${(props) => props.theme.colors.font.primary.alt5};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        font-size: ${(props) => props.theme.typography.size.small};
    }
`;

export const Logo = styled.div`
    margin: 0 0 0 10px;
    svg {
        width: 100px;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        svg {
            width: 75px;
        }
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
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
    @media(max-width: ${STYLING.cutoffs.banner}) {
        margin: 0;
        text-align: left;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        p {
            font-size: ${(props) => props.theme.typography.size.xSmall};
        }
    }
`;

export const Link = styled.div`
    width: fit-content;
    margin: 12.5px 0 0 auto;
    a {
        color: ${(props) => props.theme.colors.font.primary.alt3};
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
    @media(max-width: ${STYLING.cutoffs.banner}) {
        margin: 12.5px 0 0 0;
    }
`;