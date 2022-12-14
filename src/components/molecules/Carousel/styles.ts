import styled from "styled-components";

import { open, fadeIn2 } from "animations";
import { STYLING } from "styling-config";

export const Content = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${open} ${fadeIn2};
`;

export const Header = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Header1 = styled.h2`
    font-size: 20px;
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-family: ${(props) => props.theme.typography.family.secondary};
`;

export const Body = styled.div`
    height: calc(100% - 50px);
    width: 100%;
    .carousel-root {
        height: 100%;
    }
    .carousel.carousel-slider {
        overflow: visible;
        height: 100%;
    }
    .carousel .slider-wrapper {
        height: 100%;
    }
    .control-dots {
        top: -31.5px;
        right: 0;
        height: fit-content;
        width: fit-content;
        margin: 0;
        text-align: left;
        display: flex;
    }
    .slider {
        height: 100%;
    }
    &:hover {
        cursor: grab;
    }
`;

export const Indicator = styled.button<{ selected: boolean }>`
    height: 15px;
    width: 15px;
    margin: 0 0 0 7.5px;
    border-radius: 50%;
    background ${(props) => props.selected ?
        props.theme.colors.indicator.active.base : props.theme.colors.indicator.inactive.base};
    &:hover {
        background ${(props) => props.selected ?
            props.theme.colors.indicator.active.hover : props.theme.colors.indicator.inactive.hover};
    }
`;