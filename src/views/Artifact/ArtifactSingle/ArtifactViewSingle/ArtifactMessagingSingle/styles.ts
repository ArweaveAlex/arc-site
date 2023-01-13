import styled from "styled-components";

import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const PostContent = styled.div`
    height: fit-content;
    width: ${STYLING.dimensions.messagingContent};
    max-width: 90vw;
    margin: 42.5px auto;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    background: ${(props) => props.theme.colors.container.primary.background};
    border-radius: ${STYLING.dimensions.borderRadius};
    padding: 10px;
`;

export const InfoData = styled.div`
    span {
        font-size: 13px;
        line-height: 18px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    p, a {
        font-size: ${(props) => props.theme.typography.size.small};
        line-height: 18px;
        color: ${(props) => props.theme.colors.font.primary.active.base};
        margin: 5px 0 0 0;
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
    margin: 0 0 15px 0;
    span, p, a, b {
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 24px;
        overflow: visible;
        white-space: pre-wrap;
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;