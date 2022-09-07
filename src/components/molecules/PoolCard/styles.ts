import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`;

export const C1 = styled.div`
    height: 100%;
    width: 35%;
`;

export const C1Content = styled.div`
    height: calc(100% - 80px);
    width: calc(100% - 10px);
    padding: 30px;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Title = styled.h2`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    margin: 0 0 20px 0;
`;

export const Description = styled.p`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-size: ${(props) => props.theme.typography.size.base};
    line-height: 1.35;
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
    height: 70px;
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
`;

export const C2 = styled.div`
    height: 100%;
    width: 65%;
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    background-size: cover;
`;