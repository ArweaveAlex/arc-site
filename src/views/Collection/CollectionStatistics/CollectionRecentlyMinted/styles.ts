import styled from "styled-components";

import { STYLING } from "styling-config";

export const Wrapper = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    h2 {
        font-size: 32px;
        font-family: ${(props) => props.theme.typography.family.secondary};
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const Body = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0 0;
    > * {
        flex: 1 1 190px;
        margin: 0 21.5px 20px 0px;
    }
`;

export const Icon = styled.div`
    height: 72.5%;
    width: 96.5%;
    position: absolute;
    top: 37.5%;
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
    @media(max-width: ${STYLING.cutoffs.initial}) {
        svg {
            width: 37.5%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            fill: ${(props) => props.theme.colors.font.primary.base};
        }
    }
`;

export const TypeLabel = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;
    p {
        font-size: 12px;
        color: ${(props) => props.theme.colors.font.primary.base};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        text-shadow: 0px 0px 5px ${(props) => props.theme.colors.shadow.tertiary};
    }
`;

export const Info = styled.div`
    height: 20.5%;
    width: 96.5%;
    position: absolute;
    top: 86.05%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

export const InfoTitle = styled.div`
    padding: 7.5px;
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        line-height: 18px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const NodeWrapper = styled.div`
    height: 310px;
    min-width: 250px;
    width: 290px;
    max-width: 250px;
    background: ${(props) => props.theme.colors.container.primary.background};
    position: relative;
    &:hover {
        &:hover ${Icon} {
            background: ${(props) => props.theme.colors.container.alt2.background};
        }
    }
    a {
        height: 100%;
        width: 100%;
        display: block;
    }
`;