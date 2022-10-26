import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
    height: calc(100vh - (160px + ${STYLING.dimensions.navHeight}));
    width: 50px;
    border: 1px solid #c300ff;
`;