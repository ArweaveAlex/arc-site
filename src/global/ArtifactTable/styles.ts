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
`;

export const Link = styled.div`
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        display: flex;
        align-items: center;
    }
    span {
        padding: 0 !important;
    }
`;