import styled from "styled-components";

export const BookmarkToggle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        fill: ${(props) => props.theme.colors.icon.secondary.fill};
        margin: 0 0 5px 0;
    }
    button {
        margin: 7.5px 0 0 0;
    }
`;

export const Link = styled.div``;