import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";
import { open, fadeIn2 } from "helpers/animations";

const THREAD_WIDTH = "600px";
const DETAIL_WIDTH = "500px";
const WRAP_WIDTH = "675px";

export const Wrapper = styled.div`
    display: flex;
    width: 1125px;
    max-width: 90vw;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
    @media(max-width: calc(${STYLING.cutoffs.desktop} + 25px)) {
        flex-direction: column-reverse;
    }
    @media(max-height: 600px) {
        flex-direction: column-reverse;
    }

`;

export const ListWrapper = styled.div`
    min-height: 100vh;
    width: ${THREAD_WIDTH};
    max-width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-left: 1px solid ${(props) => props.theme.colors.border.primary};
    border-right: 1px solid ${(props) => props.theme.colors.border.primary};
    padding: 0 0 300px 0;
    @media(max-width: calc(${STYLING.cutoffs.desktop} + 25px)) {
        width: ${WRAP_WIDTH};
        border-top: 1px solid ${(props) => props.theme.colors.border.primary};
        border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
        border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
        margin: 0 auto;
    }
    @media(max-height: 600px) {
        width: ${WRAP_WIDTH};
        border-top: 1px solid ${(props) => props.theme.colors.border.primary};
        border-top-left-radius: ${STYLING.dimensions.borderRadiusWrapper};
        border-top-right-radius: ${STYLING.dimensions.borderRadiusWrapper};
        margin: 0 auto;
    }
`;

export const LIWrapper = styled.div<{ showBorder: boolean, active: boolean }>`
    width: 100%;
    border-bottom: ${(props) => props.showBorder ? `1px solid ${props.theme.colors.border.primary}` : 'none'};
    background: ${(props) => props.active ? 
        props.theme.colors.container.primary.background : props.theme.colors.container.primary.background};
    animation: ${open} ${fadeIn2};
`;

export const LIContent = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px 25px;
`;

export const LIHeader = styled.div`
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        height: fit-content;
        flex-direction: column;
    }
`;

export const ProfileWrapper = styled.div`
    display: flex;
`;

export const ProfileImage = styled.div`
    height: 100%;
    width: 48px;
    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }
`;

export const NUContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0 0 15px;
`;

export const P = styled.p`
    font-size: ${(props) => props.theme.typography.size.small};
`;

export const Name = styled(P)`
    color: ${(props) => props.theme.colors.font.primary.alt1};
    font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const Username = styled(P)`
    font-size: ${(props) => props.theme.typography.size.xSmall};
    font-weight: ${(props) => props.theme.typography.weight.regular};
    color: ${(props) => props.theme.colors.font.primary.alt1};
    margin: 5px 0;
`;

export const ArtifactInfoWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        margin: 20px 0 0 0;
        gap: 10px;
        align-items: start;
    }
`;

export const ArtifactLinkWrapper = styled.div`
    display: flex;
    span, a {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        line-height: 18px;
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
    a {
        font-weight: ${(props) => props.theme.typography.weight.medium};
        white-space: nowrap;
        &:hover {
            text-decoration-thickness: 1.5px;
        }
    }
`;

export const LIBody = styled.div`
    width: 100%;
    margin: 25px 0 0 0;
`;

export const InfoData = styled.div`
    span {
        font-size: 13px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    p, a {
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 18px;
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
    span, p, a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    overflow: hidden;
`;

export const Message = styled(InfoData)`
     margin: 0 0 15px 0;
     span, p, a, b {
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 24px;
        overflow: visible;
        white-space: pre-wrap;
    }
    span, b {
        color: ${(props) => props.theme.colors.font.primary.alt4};
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
`;

export const PostDate = styled(P)`
    margin: 20px 0;
    font-size: ${(props) => props.theme.typography.size.xSmall};
`;

export const PublicMetrics = styled.div`
    height: 25px;
    width: 50%;
    min-width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Metric = styled.div`
    display: flex;
    height: 100%;
    display: flex;
    align-items: center;
    svg {
        width: 15px;
        fill: ${(props) => props.theme.colors.font.primary.alt1};
    }
    p {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        color: ${(props) => props.theme.colors.font.primary.alt1};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        margin: 0 0 3.5px 10px;
        white-space: nowrap;
    }
`;

export const SingleWrapper = styled.div`
    width: ${DETAIL_WIDTH};
    position: absolute;
    right: 0;
    @media(max-width: calc(${STYLING.cutoffs.desktop} + 25px)) {
        width: ${WRAP_WIDTH};
        max-width: 100%;
        position: relative;
        right: auto;
        margin: 0 auto 20px auto;
    }
    @media(max-height: 600px) {
        width: ${WRAP_WIDTH};
        max-width: 100%;
        position: relative;
        right: auto;
        margin: 0 auto 20px auto;
    }
`;

export const SingleContent = styled.div`
    height: 580px;
    width: ${DETAIL_WIDTH};
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    top: 95px;
    @media(max-width: calc(${STYLING.cutoffs.desktop} + 25px)) {
        height: auto;
        width: ${WRAP_WIDTH};
        max-width: 100%;
        position: relative;
        top: auto;
    }
    @media(max-height: 600px) {
        height: auto;
        width: ${WRAP_WIDTH};
        max-width: 100%;
        position: relative;
        top: auto;
    }
`;

export const HeaderWrapper = styled.div`
    min-height: 141.5px;
    width: 100%;
    position: relative;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
    padding: 20px 20px 15px 20px;
    margin: 0 0 20px 0;
    a {
        font-size: 22px;
        font-weight: 500;
        white-space: nowrap;
        &:hover {
            text-decoration-thickness: 1.5px;
        }
    }
    @media(max-width: calc(${STYLING.cutoffs.desktop} + 25px)) {
        margin: 20px 0;
    }
    @media(max-height: 600px) {
        margin: 20px 0;
    }
`;

export const HeaderContent = styled.div`
    height: 100%;
    width: 100%;
    animation: ${open} ${fadeIn2};
`;

export const SubheaderFlex = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 0 0 0;
`;

export const SubheaderContainer = styled.div`
    display: flex;
    margin: 7.5px 0;
    white-space: nowrap;
    overflow: hidden;
`;

export const Subheader1 = styled.div`
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 20px;
        color: ${(props) => props.theme.colors.font.primary.alt6};
    }
`;

export const Subheader2 = styled.div`
    p, a {
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 20px;
        font-weight: ${(props) => props.theme.typography.weight.regular};
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const ID = styled(Subheader2)``;

export const DetailWrapper = styled.div`
    min-height: 141.5px;
    width: 100%;
    position: relative;
    animation: ${open} ${fadeIn2};
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
    z-index: 3;
`;

export const LoadingContainerInit = styled.div`
    height: 100px;
    width: 100%;
    position: relative;
    margin: 20px 0 0 0;
`;

export const ActionContainer = styled.div`
    height: 42.5px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.colors.border.alt1};
    button {
        height: 100% !important;
        width: 100% !important;
        border: none !important;
    }
`;

export const ActiveContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 0 0 0 7.5px;
    svg {
        height: 15px;
        width: 15px;
        fill: ${(props) => props.theme.colors.icon.alt1.fill};
    }
`;