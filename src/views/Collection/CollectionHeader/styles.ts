import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/config";

export const Wrapper = styled.div`
    width: 100%;
    animation: ${open} ${fadeIn2};
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        height: auto;
    }
`;

export const Header = styled.div`
    width: 100%;
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
        margin: 0 0 35px 0;
    }
`;

export const HeaderFlex = styled.div`
    display: flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: fit-content;
        flex-direction: column;
        margin: 0 0 20px 0;
    }
`;

export const H2 = styled.h2`
    font-size: 28px;
    line-height: 1.25;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 24px;
    }
`;

export const Header1 = styled(H2)`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-family: ${(props) => props.theme.typography.family.secondary};
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        margin: 0 0 20px 0;
    }
`;

export const SubheaderFlex = styled.div`
    display: flex;
    margin: 7.5px 0 0 0;
`;

export const Subheader1 = styled.div`
    p {
        color: ${(props) => props.theme.colors.font.primary.alt1};
    }
`;

export const Subheader2 = styled.div`
    p {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const ID = styled(Subheader2)`
    width: 125px;
    p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const Image = styled.div<{ image: string }>`
    height: 425px;
    width: 100%;
    background-image: ${(props) => `url("${props.image}")`};
    background-size: cover;
    background-position: center;
    margin: 0 0 20px 0;
`;

export const FlexTiles = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-direction: column;
    }
`;

export const Tile = styled.div`
    height: 100px;
    width: 33%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    padding: 15px;
    position: relative;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
        margin: 0 0 20px 0;
    }
`;

export const ContributeTile = styled(Tile)`
    background: ${(props) => props.theme.colors.container.secondary.background};
    border: 1px solid ${(props) => props.theme.colors.border.tertiary};
`;

export const TileTitle = styled.div`
    p {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const TileData = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    p {
        font-size: 22px;
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-family: ${(props) => props.theme.typography.family.secondary};   
        font-weight: ${(props) => props.theme.typography.weight.bold};
        text-align: center;
    }
`;

export const TContainer = styled.div`
    margin: 1.15px 0 0 7.5px;
    p {
        font-size: 20px;
        font-weight: ${(props) => props.theme.typography.weight.regular};
        font-family: ${(props) => props.theme.typography.family.primary};
        color: ${(props) => props.theme.colors.font.primary.alt2};
    }
`;