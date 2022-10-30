import styled from "styled-components";

export const EmptyWrapper = styled.div`
    margin: 20px 0;
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;

export const BookmarkToggle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        fill: ${(props) => props.theme.colors.icon.secondary.fill};
    }
`;

export const Link = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${(props) => props.theme.typography.size.base};
    color: ${(props) => props.theme.colors.font.primary.alt1};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;