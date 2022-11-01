import styled from "styled-components";

import { STYLING } from "styling-config";

export const Wrapper = styled.div`
    height: calc(100vh - (165px + ${STYLING.dimensions.navHeight}));
    width: 50px;
    position: fixed;
    top: 215px;
    // background: #c300ff;
    // border: 1px solid #c300ff;
`;