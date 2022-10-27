import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
`;

export const RawData = styled.div`
    height 300px;
    width: 300px;
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    background: ${(props) => props.theme.colors.container.alt1.background};
    padding: 20px;
    position: relative;
    div {
        height: 90%;
        width: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
    }
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: wrap;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        color: ${(props) => props.theme.colors.font.primary.base};
    }
`;