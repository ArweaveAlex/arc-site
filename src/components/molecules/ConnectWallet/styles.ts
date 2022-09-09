import styled from "styled-components";

import { STYLING } from "@/config";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const WalletListContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const WalletListItem = styled.button`
    height: 50px;
    width: 100%;
    text-align: left;
    padding: 20px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    display: flex;
    align-items: center;
    &:hover {
        background: ${(props) => props.theme.colors.container.primary.hover};
    }
`;

export const WalletDropdown = styled.ul`
    width: 225px;
    padding: 10px 0;
    position: absolute;
    top: 55.5px;
    right: 18.5px;
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    background: ${(props) => props.theme.colors.container.primary.background};

    @media(max-width: ${STYLING.cutoffs.initial}) {
        position: relative;
        right: auto;
        top: auto;
        margin: 10px 0 0 0;
    }
    li {
        text-align: center;
        height: 35px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: ${(props) => props.theme.typography.size.xSmall};
        &:hover {
            background: ${(props) => props.theme.colors.container.primary.hover};
        }
    }
    span {
        font-size: ${(props) => props.theme.typography.size.xSmall};
    }
`;

export const Icon = styled.div<{ strokeFill: boolean }>`
    svg {
        width: 17.5px;
        margin: 5.5px 17.5px 0 17.5px;
        fill: ${(props) => props.strokeFill ? "none" : props.theme.colors.font.primary.active.base};
        stroke: ${(props) => props.strokeFill ? props.theme.colors.font.primary.active.base : "none"};
    }
`