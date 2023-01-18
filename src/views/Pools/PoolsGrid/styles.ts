import styled from "styled-components/macro";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    width: 100%;
    padding: 0 20px 20px 20px;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    animation: ${open} ${fadeIn2};
    margin: 0 auto;
    overflow: hidden;
`;

export const SubheaderFlex = styled.div`
    display: flex;
    margin: 7.5px 0 20px 0;
    padding: 0 2.5px;
    margin: 20px 0;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.initial}) {
        flex-direction: column;
        margin: 12.5px 0;
    }
`;

export const SubheaderContainer = styled.div`
    display: flex;
    @media(max-width: ${STYLING.cutoffs.initial}) {
        margin: 12.5px 0 25px 0;
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
    width: calc(100% + 50px);
    display: flex;
    flex-wrap: wrap;
    margin: -25px;
    padding: 0 0 25px 0;
    @media(max-width: ${STYLING.cutoffs.initial}) {
        margin: 0;
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
    @media(max-width: ${STYLING.cutoffs.initial}) {
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
    width: calc(33.3% - 50px);
    animation: ${open} ${fadeIn2};
    margin: 25px;
    background: ${(props) => props.theme.colors.container.primary.background};
    position: relative;
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-radius: ${STYLING.dimensions.borderRadiusWrapper};
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
        width: 90vw;
        margin: 0 0 25px 0;
    }
`;