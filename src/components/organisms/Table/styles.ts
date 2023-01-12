import styled from "styled-components";

import { AlignType } from "helpers/types";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    width: 100%;
    animation: ${open} ${fadeIn2};
    scroll-margin-top: 100px;
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        height: auto;
        scroll-margin-top: 20px;
    }
`;

export const Header = styled.div`
    width: 100%;
    margin: 0 0 25px 0;
    display: flex;
    flex-direction: column;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
        margin: 0 0 15px 0;
    }
`;

export const HeaderFlex = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
`;

export const H2 = styled.h2`
    font-size: 32px;
    font-family: ${(props) => props.theme.typography.family.secondary};
    color: ${(props) => props.theme.colors.font.primary.alt4};
`;

export const Body = styled.div`
    width: 100%;
    margin: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    animation: ${open} ${fadeIn2};
`;

export const Table = styled.div`
    height: 100%;
    width: 100%;
    border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
    box-shadow: 1px 2px 2px ${(props) => props.theme.colors.shadow.secondary};
    @media(max-width: ${STYLING.cutoffs.initial}) {
        width: ${STYLING.cutoffs.initial};
    }
`;

export const TableHeader = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    border-top 1px solid ${(props) => props.theme.colors.border.alt1};
`;

export const Row = styled.div<{ even: boolean }>`
    height: 40px;
    display: flex;
    align-items: center;
    background: ${(props) => props.even ? 
        props.theme.colors.container.primary.background : props.theme.colors.container.alt4.background};
`;

export const RowData = styled.div`
    height: 100%;
    display: flex;
    padding: 0 10px;
    background: ${(props) => props.theme.colors.container.alt3.background}; 
    border-left: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-right: 1px solid ${(props) => props.theme.colors.border.alt1};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.alt1};
    align-items: center;
    p {
        font-family: ${(props) => props.theme.typography.family.primary};
        font-size: ${(props) => props.theme.typography.size.small};
        color: ${(props) => props.theme.colors.font.primary.active.base};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        margin: 5.5px 0 0 0;
    }
`;

export const THeader = styled(RowData)<{ even: boolean, width: string, align: AlignType }>`
    width: ${(props) => props.width};
    border-left: 1px solid ${(props) => props.even ? "transparent" : props.theme.colors.border.alt1};
    border-right: 1px solid ${(props) => props.even ? "transparent" : props.theme.colors.border.alt1};
    display: flex;
    justify-content: ${(props) => props.align};
    p {
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;

export const TData = styled(RowData)<{ even: boolean, width: string }>`
    width: ${(props) => props.width};
    border-left: 1px solid ${(props) => props.even ? "transparent" : props.theme.colors.border.alt1};
    border-right: 1px solid ${(props) => props.even ? "transparent" : props.theme.colors.border.alt1};
    background: none;
    div {
        overflow: hidden;
    }
    p {
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.regular};
        font-size: ${(props) => props.theme.typography.size.small};
    }
`;