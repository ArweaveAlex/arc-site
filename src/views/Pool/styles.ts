import styled from "styled-components";

import { STYLING } from "config/styling";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px;
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