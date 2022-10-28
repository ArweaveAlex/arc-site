import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`;

export const IconWrapper = styled.div`
    height 375px;
    width: 375px;
    background: ${(props) => props.theme.colors.container.primary.background};
    position: relative;
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: wrap;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        color: ${(props) => props.theme.colors.font.primary.base};
    }
`;

export const Icon = styled.div`
    height: 97.5%;
    width: 97.5%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.container.alt1.background};
    svg {
        width: 57.5%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: ${(props) => props.theme.colors.font.primary.base};
    }
`;

export const Content = styled.div`
    height: 100%;
    width: calc(100% - 400px);
    margin: 0 0 0 25px;
`;

export const ContentLine = styled.div`
    width: 100%;
    margin: 0 0 15px 0;
    padding: 17.5px;
    background: ${(props) => props.theme.colors.container.primary.background};
`;

export const InfoData = styled.div`
    button, span {
        font-size: ${(props) => props.theme.typography.size.small};
        font-weight: ${(props) => props.theme.typography.weight.regular};
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    button {
        &:hover {
            color: ${(props) => props.theme.colors.font.primary.active.hover};
        }
    }
    p, a {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        color: ${(props) => props.theme.colors.font.primary.active.base};
    }
    span, p, a {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    svg {
        width: 25px;
        margin: 0 10px 0 0;
        fill: ${(props) => props.theme.colors.font.primary.alt5};
    }
    overflow: hidden;
`;

export const BodyData = styled.p`
    margin: 15px 0 0 0;
`;

export const RawData = styled.div`
    margin: 15px 0 0 0;
    p {
        overflow: visible;
        white-space: normal;
    }
`;

export const Icons = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`;

export const IconLine = styled.div`
    display: flex;
    align-items: center;
    margin: 0 20px 0 0;
`;

export const LinkWrapper = styled.div`
    width: 100%;
    padding: 17.5px;
    background: ${(props) => props.theme.colors.container.primary.background};
    svg {
        width: 25px;
        margin: 0 17.5px 0 0;
        fill: ${(props) => props.theme.colors.font.primary.alt4};
    }
    span, p, a {
        line-height: 18px;
        text-overflow: ellipsis;
        overflow: visible;
        white-space: normal;
    }
`;

export const LinkWrapperAlt = styled(LinkWrapper)`
    background: ${(props) => props.theme.colors.view.background};
`;

export const Tags = styled.div`
    margin: 15px 0 0 0;
    display: flex;
    flex-wrap: wrap;
`;

export const Tag = styled.div`
    padding: 12.5px;
    width: fit-content;
    margin: 0 10px 10px 0;
    background: ${(props) => props.theme.colors.view.background};
    p {
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;