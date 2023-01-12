import styled from "styled-components";

import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    width: calc(100% - 40px);
    position: fixed;
    max-width: calc(${STYLING.cutoffs.max} - 40px);
    z-index: 3;
    position: fixed;
    height: 140px;
    top: ${STYLING.dimensions.navHeight};
    background: ${(props) => props.theme.colors.view.background};
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        width: 100%;
        margin: 0 0 0 -20px;
    }
`;

export const ContentWrapper = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
`;

export const Content = styled.div`
    height: 100%;
    width: calc(100% - 110px);
    max-width: ${STYLING.cutoffs.max};
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    box-shadow: 0 1px 1px 0 ${(props) => props.theme.colors.shadow.primary};
    border-bottom-left-radius: ${STYLING.dimensions.borderRadiusField};
    border-bottom-right-radius: ${STYLING.dimensions.borderRadiusField};
`;

export const Info = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    position: relative;
    background: ${(props) => props.theme.colors.container.alt1.background};
    border-top: 1px solid ${(props) => props.theme.colors.border.alt4};
    border-left: 1px solid ${(props) => props.theme.colors.border.alt4};
    border-right: 1px solid ${(props) => props.theme.colors.border.alt4};
    border-top-left-radius: ${STYLING.dimensions.borderRadiusField};
    border-top-right-radius: ${STYLING.dimensions.borderRadiusField};
`;

export const InfoData = styled.div`
    height: 77.5%;
    width: calc(30.5% - 50px);
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin: auto 0;
    div, p, a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        color: ${(props) => props.theme.colors.font.primary.base};
    }
    p {
        line-height: 16px;
    }
`;

export const InfoTitle = styled(InfoData)`
    padding: 0 20px;
`;

export const InfoStyled = styled(InfoData)`
    div, p, a {
        color: ${(props) => props.theme.colors.font.primary.base};
    }
    div, a {
        text-decoration: underline;
        &:hover {
            cursor: pointer;
            color: ${(props) => props.theme.colors.font.primary.alt5};
        }
    }
    svg {
        width: 25px;
        margin: 0 10px 0 0;
        fill: ${(props) => props.theme.colors.font.primary.alt5};
    }
    border-left: 1px solid ${(props) => props.theme.colors.border.alt2};
    @media(max-width: ${STYLING.cutoffs.initial}) {
        svg {
            display: none;
        }
    }
`;

export const InfoType = styled(InfoStyled)`
    width: 15%;
`;

export const InfoMintDate = styled(InfoStyled)`
    width: 20%;
`;

export const InfoOwner = styled(InfoStyled)`
    width: 15%;
`;

export const InfoPools = styled(InfoStyled)`
    width: 20%;
`;

export const Body = styled.div`
    height: 50%;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
`;

export const TabWrapper = styled.div<{ label: string }>``;