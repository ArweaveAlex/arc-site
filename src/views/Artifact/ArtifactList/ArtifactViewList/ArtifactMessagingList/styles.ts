import styled from "styled-components";

import { open, fadeIn2 } from "config/animations";

export const Wrapper = styled.div`
    animation: ${open} ${fadeIn2};
`;

export const ListWrapper = styled.div`
    min-height: 100vh;
    width: 750px;
    margin: 0 auto;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-left: 1px solid ${(props) => props.theme.colors.border.primary};
    border-right: 1px solid ${(props) => props.theme.colors.border.primary};
    animation: ${open} ${fadeIn2};
    > * {
        &:last-child {
           border-bottom: none;
        }
      }
`;

export const ListItemWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    padding: 15px;
    p {
        margin: 5px 0;
    }
`;

export const LoadingContainer = styled.div`
    height: 50px;
    width: 100%;
    position: relative;
    margin: 20px 0 0 0;
    border: 1px solid red;
`;