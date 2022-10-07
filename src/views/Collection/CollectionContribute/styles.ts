import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Wrapper = styled.button`
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.colors.button.secondary.background};
    border: 1px solid ${(props) => props.theme.colors.border.tertiary};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: ${(props) => props.theme.colors.button.secondary.hover};
    }
    &:focus {
      background: ${(props) => props.theme.colors.button.secondary.hover};
    }
`;

export const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 30px;
        margin: 0 20px 0 0;
    }
    span {
        font-size: 24px;
        color: ${(props) => props.theme.colors.font.primary.base};
        font-family: ${(props) => props.theme.typography.family.secondary};
    }
`;

export const Header = styled.div`
    width: 100%;
    margin: 0 0 20px 0;
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
    font-family: ${(props) => props.theme.typography.family.secondary};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        margin: 0 0 20px 0;
    }
`;

export const FormField = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
`;