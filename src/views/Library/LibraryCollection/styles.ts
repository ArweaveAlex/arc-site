import styled from "styled-components/macro";

export const Wrapper = styled.div`
    margin: 25px 0 0 0;
`;

export const CollectionToggle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: ${(props) => props.theme.colors.icon.secondary.fill};
    }
`;