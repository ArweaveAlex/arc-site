import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 500px;
    width: 100%;
`;

export const Content = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${open} ${fadeIn2};
`;

export const Header = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Header1 = styled.h2`
    font-size: 20px;
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-family: ${(props) => props.theme.typography.family.secondary};
`;

export const Body = styled.div`
    height: calc(100% - 50px);
    width: 100%;
`;