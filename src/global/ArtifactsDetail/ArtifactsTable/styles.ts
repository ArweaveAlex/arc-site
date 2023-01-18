import styled from "styled-components/macro";

export const TypeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 20px;
        fill: ${(props) => props.theme.colors.font.primary.active.base};
    }
`;

export const Link = styled.div``;

export const CollectionToggle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        fill: ${(props) => props.theme.colors.icon.secondary.fill} !important;
        margin: 0 0 5px 0;
    }
    button {
        margin: 7.5px 0 0 0;
    }
`;