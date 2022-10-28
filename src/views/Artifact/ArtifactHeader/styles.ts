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
`;

export const HideWrapper = styled.div`
    height: 100%;
    width: 50px;
`;

export const Content = styled.div`
    height: 100%;
    width: calc(100% - 110px);
    max-width: ${STYLING.cutoffs.max};
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    box-shadow: 0px 3px 5px ${(props) => props.theme.colors.shadow.primary};
`;

export const Info = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    position: relative;
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
`;

export const InfoData = styled.div`
    height: 77.5%;
    width: calc(30.5% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin: auto 0;
    p, a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        color: ${(props) => props.theme.colors.font.primary.base};
    }
`;

export const InfoTitle = styled(InfoData)``;

export const InfoStyled = styled(InfoData)`
    p, a {
        color: ${(props) => props.theme.colors.font.primary.alt5};
    }
    a {
        text-decoration: underline;
        &:hover {
            color: ${(props) => props.theme.colors.font.primary.alt4};
        }
    }
    svg {
        width: 25px;
        margin: 0 10px 0 0;
        fill: ${(props) => props.theme.colors.font.primary.alt5};
    }
    border-left: 1px solid ${(props) => props.theme.colors.border.tertiary};
`;

export const InfoType = styled(InfoStyled)`
    width: 12.5%;
`;

export const InfoMintDate = styled(InfoStyled)`
    width: 21.5%;
`;

export const InfoOwner = styled(InfoStyled)`
    width: 15.5%;
`;

export const InfoCollection = styled(InfoStyled)`
    width: 21.5%;
`;

export const TabsWrapper = styled.div`
    height: 50%;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-bottom-left-radius: ${STYLING.dimensions.borderRadius};
    border-bottom-right-radius: ${STYLING.dimensions.borderRadius};
    display: flex;
    align-items: end;
    padding: 0 60px;
`;

export const TabWrapper = styled.div<{ label: string }>``;