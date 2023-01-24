import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";
import { open, fadeIn2 } from "helpers/animations";

const DETAIL_WIDTH = "500px";
const WRAP_WIDTH = "675px";

export const LIWrapper = styled.div<{ isListItem: boolean, active: boolean }>`
    width: 100%;
    border-bottom: ${(props) => props.isListItem ? `1px solid ${props.theme.colors.border.primary}` : 'none'};
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
    margin: 0 15px 0 0;
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

export const AInfoWrapper = styled.div`
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

export const ALinkWrapper = styled.div`
    display: flex;
`;

export const ALink = styled.div`
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

export const ALinkNT = styled.div`
    margin: 0 0 0 12.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    svg {
        width: 12.5px;
        fill: ${(props) => props.theme.colors.button.alt1.background};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover {
            fill: ${(props) => props.theme.colors.button.alt1.hover};
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
    height: 80vh;
    width: 500px;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    top: ${STYLING.dimensions.navHeight};

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
    display: flex;
    align-items: center;
    margin: 1.15px 7.5px 0 0;
    svg {
        height: 15px;
        width: 15px;
        fill: ${(props) => props.theme.colors.icon.alt1.fill};
    }
`;

export const ChildAssetContainer = styled.div`
    min-height: 300px;
    width: 100%;
    margin: 15px 0 0 0;
    position: relative;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt6};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};  
`;

export const MediaWrapper = styled.div`
    width: ${STYLING.dimensions.messagingContent};
    max-width: 100%;
    margin: 0 auto;
    position: relative;
`;

export const MediaElement = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MediaContent = styled.div`
    height: ${STYLING.dimensions.messagingContent};
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.container.alt5.background};
    border-radius: ${STYLING.dimensions.borderRadius};
`;

export const ImageContent = styled(MediaContent) <{ image: string }>`
    height: ${STYLING.dimensions.messagingContent};
    background-image: ${(props) => `url("${props.image}")`};
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
`;

export const VideoContent = styled.video`
    height: 100%;
    width: 100%;
    cursor: pointer;
    source {
        cursor: pointer;
    }
`;

export const VideoSource = styled.source``;

export const ArweaveLinkWrapper = styled.div`
    background: ${(props) => props.theme.colors.container.primary.background};
    height: 100px;
    width: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadius};
    margin: 20px 0;
    &:hover {
        background: ${(props) => props.theme.colors.container.primary.hover};
    }
    a {
        text-decoration: none !important;
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
`;

export const ArweaveLink = styled.a`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;