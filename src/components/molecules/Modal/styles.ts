import styled from "styled-components";

import { open, fadeIn1 } from "@/animations";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    background: ${(props) => props.theme.colors.overlay.primary};
    animation: ${open} ${fadeIn1};
`;

export const Container = styled.div`
    height: 600px;
    max-height: 80vh;
    width: 500px;
    max-width: 95vw;
    background: ${(props) => props.theme.colors.container.primary.background};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Header = styled.div`
    height: 65px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.alt1.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const LT = styled.div`
    display: flex;
    align-items: center;
`;

export const Logo = styled.div`
    margin: 0 20px 0 0;
    svg {
        width: 30px;
    }
`;

export const Title = styled.h2`
    color: ${(props) => props.theme.colors.font.primary.base};
    font-family: ${(props) => props.theme.typography.family.secondary};
`

export const Close = styled.div`
    padding: 2.5px 0 0 0;
`;

export const Body = styled.div`
    height: calc(100% - 65px);
    width: 100%;
    overflow-y: auto;
`;
