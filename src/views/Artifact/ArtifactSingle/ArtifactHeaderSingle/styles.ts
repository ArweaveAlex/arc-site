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
`;

export const Info = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    position: relative;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-top: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
    border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
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
        color: ${(props) => props.theme.colors.font.primary.active.base};
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
        color: ${(props) => props.theme.colors.font.primary.active.base};
    }
    a {
        text-decoration: underline;
        &:hover {
            cursor: pointer;
            color: ${(props) => props.theme.colors.font.primary.active.hover};
        }
    }
    svg {
        width: 25px;
        margin: 0 10px 0 0;
        fill: ${(props) => props.theme.colors.font.primary.active.base};
    }
    border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
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
    height: 46.5%;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
    border-bottom-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
    border-bottom-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
`;

export const TabWrapper = styled.div<{ label: string }>``;