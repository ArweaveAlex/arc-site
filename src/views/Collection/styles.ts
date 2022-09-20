import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    padding: 20px;
`;