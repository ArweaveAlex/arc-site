import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
    width: calc(100% - 40px);
    position: fixed;
    max-width: calc(${STYLING.cutoffs.max} - 40px);
    z-index: 1;
    position: fixed;
    height: 140px;
    top: ${STYLING.dimensions.navHeight};
    background: ${(props) => props.theme.colors.view.background};
`;

export const ContentWrapper = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    // border: 1px solid #e511ff;
`;

export const HideWrapper = styled.div`
    height: 100%;
    width: 50px;
    // border: 1px solid red;
`;

export const Content = styled.div`
    height: 100%;
    width: calc(100% - 110px);
    max-width: ${STYLING.cutoffs.max};
    width: 100%;
    // margin: 0 0 0 20px;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    box-shadow: 0px 3px 5px ${(props) => props.theme.colors.shadow.primary};
`;

export const Info = styled.div`
    height: 50%;
    width: 100%;
    padding: 0 10px;
    display: flex;
    background: ${(props) => props.theme.colors.container.alt1.background};
    border-top-left-radius: ${STYLING.dimensions.borderRadius};
    border-top-right-radius: ${STYLING.dimensions.borderRadius};
`;

export const InfoLogo = styled.div`
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 30px;
        fill: ${(props) => props.theme.colors.icon.primary.fill};
    }
    // border: 1px solid red;
`;

export const InfoData = styled.div`
    height: 100%;
    width: calc(30.5% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    // border: 1px solid red;
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        color: ${(props) => props.theme.colors.font.primary.base};
    }
`;

export const InfoTitle = styled(InfoData)``;

export const InfoType = styled(InfoData)`
    height: 100%;
    width: 10%;
    justify-content: space-evenly;
    p {
        color: ${(props) => props.theme.colors.font.primary.alt5};
    }
    svg {
        fill: ${(props) => props.theme.colors.font.primary.alt5};
    }
`;

export const InfoMintDate = styled(InfoData)`
    height: 100%;
    width: 16.5%;
    p {
        color: ${(props) => props.theme.colors.font.primary.alt5};
    }
`;

export const InfoOwner = styled(InfoData)`
    height: 100%;
    width: 13.5%;
    p {
        color: ${(props) => props.theme.colors.font.primary.alt5};
    }
`;

export const InfoCollection = styled(InfoData)`
    height: 100%;
    width: 20%;
    p {
        color: ${(props) => props.theme.colors.font.primary.alt5};
    }
    // border: 1px solid red;
`;

export const Tabs = styled.div`
    height: 50%;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
    border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
`;