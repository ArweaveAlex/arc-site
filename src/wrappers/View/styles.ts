import styled from "styled-components";

import { STYLING } from "@/config";

export const Wrapper = styled.div`
    min-height: calc(100vh - ${STYLING.dimensions.navHeight});
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: ${STYLING.dimensions.navHeight} auto 0 auto;
`;