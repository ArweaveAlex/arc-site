import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";

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
