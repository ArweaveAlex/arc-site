import styled from "styled-components";

import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 200px;
    width: 100%;
    position: absolute;
    left: 0;
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
`;

export const HeaderContainer = styled.div`
    width: 750px;
`;

export const H1 = styled.h1`
    font-size: 56px;
    line-height: 1.25;
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

export const Flex = styled.div`
    display: flex;
`;

export const Highlight = styled.div`
    height: 32.5px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.tertiary.background};
    position: absolute;
    bottom: 0;
`;