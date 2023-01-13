import styled from "styled-components";

import { open, fadeIn2 } from "helpers/animations";

export const Wrapper = styled.div`
    animation: ${open} ${fadeIn2};
`;

export const ListWrapper = styled.div`
    min-height: 100vh;
    width: 700px;
    max-width: 100%;
    margin: 0 auto;
    background: ${(props) => props.theme.colors.container.primary.background};
    border-left: 1px solid ${(props) => props.theme.colors.border.primary};
    border-right: 1px solid ${(props) => props.theme.colors.border.primary};
    animation: ${open} ${fadeIn2};
    padding: 0 0 300px 0;
`;

export const LIWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    background: ${(props) => props.theme.colors.container.primary.background};
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

export const ArtifactLinkWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span, a {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        line-height: 18px;
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
    a {
        font-weight: ${(props) => props.theme.typography.weight.medium};
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
    span {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const PostDate = styled(P)`
    margin: 20px 0;
    font-size: ${(props) => props.theme.typography.size.xSmall};
`;

export const PublicMetrics = styled.div`
    height: 25px;
    width: 50%;
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
    }
`;

export const LoadingContainer = styled.div`
    height: 100px;
    width: 100%;
    position: relative;
    margin: 20px 0 0 0;
`;