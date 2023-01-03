import styled from "styled-components";

import { loadingSlide } from "config/animations";

export const PlaceholderWrapper = styled.div``;

export const PlaceholderContainer = styled.div``;

export const Placeholder = styled.div`
    height: 40px;
    width: 100%;
    display: block;
    margin: 0 0 10px 0;
    background: linear-gradient(
        to right,
        ${(props) => props.theme.colors.table.placeholder.backgroundStart},
        ${(props) => props.theme.colors.table.placeholder.backgroundSlide} 50%,
        ${(props) => props.theme.colors.table.placeholder.backgroundEnd} 80%
    ),
    ${(props) => props.theme.colors.table.placeholder.background};
    background-repeat: repeat-y;
    background-size: 50px 500px;
    background-position: 0 0;
    animation: ${loadingSlide} 1.25s infinite;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
`;