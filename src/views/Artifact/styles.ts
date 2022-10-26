import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
    width: 100%;
`;

export const Content = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px;
    animation: ${open} ${fadeIn2};
`;

export const FlexWrapper = styled.div`
    display: flex;
    margin: 20px 0 0 0;
`;

export const ArtifactWrapper = styled.div`
    width: calc(100% - 70px);
    margin: 0 0 0 20px;
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
`;