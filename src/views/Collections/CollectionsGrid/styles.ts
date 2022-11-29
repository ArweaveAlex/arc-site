import styled from "styled-components";

import { open, fadeIn2 } from "animations";
import { STYLING } from "styling-config";

export const Wrapper = styled.div`
    width: 100%;
    animation: ${open} ${fadeIn2};
    padding: 0 20px;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
`;

export const SubheaderFlex = styled.div`
    display: flex;
    margin: 7.5px 0 20px 0;
    padding: 0 2.5px;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-direction: column;
        margin: 7.5px 0 0 0;
    }
`;

export const SubheaderContainer = styled.div`
    display: flex;
    margin: 10px 0 0 0;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        margin: 0 0 7.5px 0;
    }
`;

export const Subheader1 = styled.div`
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        color: ${(props) => props.theme.colors.font.primary.alt6};
    }
`;

export const Subheader2 = styled.div`
    p {
        font-size: ${(props) => props.theme.typography.size.base};
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const Body = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0 0 0;
    margin: 0 0 20px 0;
    > * {
        flex: 1 1 400px;
        margin: 0 0 25px 0px;
    }
`;

export const C2 = styled.div<{ image: string }>`
    height: 82.5%;
    width: 96.5%;
    position: absolute;
    top: 42.95%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: ${(props) => `url("${props.image}")`};
    background-size: cover;
    background-position: center;
    @media(max-width: ${STYLING.cutoffs.initial}) {
        width: 97.5%;
        top: 43.95%;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        width: 96.5%;
        top: 42.95%;
    }
`;

export const Info = styled.div`
    height: 13.5%;
    width: 96.5%;
    position: absolute;
    top: 91.95%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 7.5px;
`;

export const InfoTitle = styled.div`
    margin: 7.5px 0 6.5px 0;
    p {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: ${(props) => props.theme.typography.size.base};
        line-height: 20px;
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-family: ${(props) => props.theme.typography.family.secondary};
    }
`;

export const DCContainer = styled.div`
    display: flex;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        margin: 0 0 7.5px 0;
    }
`;

export const DC1 = styled.div`
    p {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        color: ${(props) => props.theme.colors.font.primary.alt6};
    }
`;

export const DC2 = styled.div`
    p {
        font-size: ${(props) => props.theme.typography.size.xSmall};
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const PCWrapper = styled.div`
    height: 400px;
    min-width: 400px;
    max-width: 400px;
    background: ${(props) => props.theme.colors.container.primary.background};
    position: relative;
    a {
        height: 100%;
        width: 100%;
        display: block;
    }
    &:hover {
        cursor: pointer;
        &:hover ${C2} {
            opacity: 0.75;
        }
    }
    @media(max-width: ${STYLING.cutoffs.initial}) {
        min-width: 100%;
        max-width: 100%;
    }
`;