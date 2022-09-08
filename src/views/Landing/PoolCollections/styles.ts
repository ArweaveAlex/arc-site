import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 500px;
    width: 100%;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: fit-content;
    }
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

export const PCWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-direction: column;
    }
`;

export const C1 = styled.div`
    height: 100%;
    width: 35%;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
    }
`;

export const C1Content = styled.div`
    height: calc(100% - 60px);
    width: calc(100% - 10px);
    padding: 30px;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
        width: 100%;
    }
`;

export const Title = styled.h2`
    line-height: 1.25;
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    margin: 0 0 20px 0;
`;

export const Description = styled.p`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-size: ${(props) => props.theme.typography.size.base};
    line-height: 1.45;
`;

export const Link = styled.a`
    &:hover {
        text-decoration: none;
    }
    &:focus {
        text-decoration: none;
    }
`;

export const LinkContainer = styled.div`
    height: 50px;
    width: calc(100% - 10px);
    margin: 10px 0 0 0;
    border: 1px solid ${(props) => props.theme.colors.border.tertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.font.primary.active.base};
    &:hover {
      background: ${(props) => props.theme.colors.font.primary.active.hover};
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.base};
        font-size: ${(props) => props.theme.typography.size.base}; 
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
    }
`;

export const C2 = styled.div`
    height: 100%;
    width: 65%;
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    background-size: cover;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: 200px;
        width: 100%;
        margin: 10px 0 0 0;
    }
`;