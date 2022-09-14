import styled from "styled-components";

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