import styled from "styled-components";

import { open, fadeIn2 } from "animations";
import { STYLING } from "styling-config";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    padding 20px 0;
    background: ${(props) => props.theme.colors.container.alt1.background};
    @media(max-width: ${STYLING.cutoffs.banner}) {
        height: auto;
    }
`;

export const HeaderContent = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px 20px 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: ${open} ${fadeIn2};
    @media(max-width: ${STYLING.cutoffs.banner}) {
        flex-direction: column;
        align-items: start;
        padding: 35px 20px;
    }
`;

export const HeaderContainer = styled.div``;

export const ShareWrapper = styled.div`
    height: 100%;
    width: fit-content;
    position: relative;
    @media(max-width: ${STYLING.cutoffs.banner}) {
        margin: 20px 0 0 0;
    }
`;

export const URLCopied = styled.div`
    position: absolute;
    top: -25px;
    left: -100px;
    z-index: 3;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    padding: 6.5px 15px 5px 15px;
    p {
        font-size: 12px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
        white-space: nowrap;
    }
    @media(max-width: ${STYLING.cutoffs.banner}) {
        bottom: auto;
        left: 170px;
    }
`;

export const TabsWrapper = styled.div`
    height: calc(100% - 200px);
    width: 100%;
`;

export const FlexHeader = styled.div`
    display: flex;
    align-items: center;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-wrap: wrap;
    }
`;

export const H1 = styled.h1`
    font-size: 40px;
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
    display: flex;
    align-items: center;
`;

export const Header2 = styled(Header1)`
    font-size: 40px;
    font-family: ${(props) => props.theme.typography.family.primary};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    color: ${(props) => props.theme.colors.font.primary.alt4};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 40px;
        margin: 10px 0 0 0;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        font-size: 7.5vw;
    }
`;