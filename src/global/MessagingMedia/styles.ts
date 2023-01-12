import styled from "styled-components";

import { STYLING } from "helpers/styling";

export const MediaWrapper = styled.div`
    height: ${STYLING.dimensions.messagingContent};
    width: ${STYLING.dimensions.messagingContent};
    max-width: 100%;
    margin: 0 auto;
    position: relative;
`;

export const MediaElement = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MediaContent = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.container.alt5.background};
    border-radius: ${STYLING.dimensions.borderRadius};
`;

export const ImageContent = styled(MediaContent)<{ image: string }>`
    background-image: ${(props) => `url("${props.image}")`};
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
`;

export const VideoContent = styled.video`
    height: 100%;
    width: 100%;
`;

export const VideoSource = styled.source``;

export const ContentApproveWrapper = styled.div`
    height: ${STYLING.dimensions.messagingContent};
    width: 100%;
    position: absolute;
    z-index: 2;
    bottom: -5px;
    background: ${(props) => props.theme.colors.overlay.alt2};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadius};
    backdrop-filter: blur(15px);
`;

export const ArweaveLinkWrapper = styled(ContentApproveWrapper)`
    background: ${(props) => props.theme.colors.container.primary.background};
    backdrop-filter: none;
`;

export const ContentApprove = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p, a {
        line-height: 18px;
        margin: 0 0 30px 0;
        color: ${(props) => props.theme.colors.font.primary.alt1};
        text-align: center;
    }
`;

export const ArweaveLink = styled(ContentApprove)`
    a {
        color: ${(props) => props.theme.colors.font.primary.active.base};
    }
`;
