import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const Content = styled.iframe`
    height: 100%;
    width: 100%;
    z-index: 2;
    position: absolute;     
`;

export const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
`;