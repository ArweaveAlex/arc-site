import styled from "styled-components";

import { STYLING } from "config/styling";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const PostContent = styled.div`
    height: fit-content;
    width: 650px;
    max-width: 90vw;
    margin: 42.5px auto;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    box-shadow: 0px 0px 7px 1px ${(props) => props.theme.colors.shadow.secondary};
    padding: 10px;
`;

export const InfoData = styled.div`
    span {
        font-size: 12px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    p, a {
        font-size: ${(props) => props.theme.typography.size.small};
        line-height: 18px;
        color: ${(props) => props.theme.colors.font.primary.active.base};
        margin: 10px 0 0 0;
    }
    span, p, a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    overflow: hidden;
    padding: 3.5px 20.5px 0 20.5px;
`;

export const BorderSection = styled.div`
    height: calc(100% - 10px);
    width: 50%;
    border-right: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Section = styled(BorderSection)`
    border-right: none;
`;

export const Header = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;
export const Body = styled.div`
    min-height: 260px;
    width: 100%;
    padding: 7.5px 0;
`;

export const Footer = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: end;
    border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Message = styled(InfoData)`
     p {
        line-height: 22px;
     }
     span, p, a {
        overflow: visible;
        white-space: normal;
    }
`;

export const MediaWrapper = styled.div`
    height: 700px;
    width: 650px;
    max-width: 90vw;
    margin: 0 auto;
    position: relative;
`;

export const ContentApproveWrapper = styled.div`
    height: 650px;
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

export const MediaElement = styled.div``;

export const MediaContent = styled.div`
    height: 650px;
    width: 100%;
    margin: 5px auto;
    overflow: hidden;
    position: absolute;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.overlay.alt1};
    border-radius: ${STYLING.dimensions.borderRadius};
`;

export const ImageContent = styled(MediaContent)<{ image: string }>`
    background-image: ${(props) => `url("${props.image}")`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

export const VideoContent = styled.video`
    height: 100%;
    width: 100%;
`;

export const VideoSource = styled.source``;