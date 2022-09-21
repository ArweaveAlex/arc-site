import styled from "styled-components";

import { open, fadeIn2 } from "@/animations";
import { STYLING } from "@/styling-config";

export const Wrapper = styled.div`
    width: 100%;
    animation: ${open} ${fadeIn2};
    scroll-margin-top: 25px;
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
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: fit-content;
        flex-direction: column;
        margin: 0 0 20px 0;
    }
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
`;

export const Table = styled.div`
    height: 100%;
    width: 100%;
`;

export const TableHeader = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    border-top 1px solid ${(props) => props.theme.colors.border.secondary};
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
    border-left: 1px solid ${(props) => props.theme.colors.border.secondary};
    border-right: 1px solid ${(props) => props.theme.colors.border.secondary};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.secondary};
    align-items: center;
    p {
        font-family: ${(props) => props.theme.typography.family.secondary};
        font-weight: ${(props) => props.theme.typography.weight.bold};
        color: ${(props) => props.theme.colors.font.primary.active.base};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

export const THeader = styled(RowData)<{ width: string }>`
    width: ${(props) => props.width};
`;

export const TableBody = styled.div`
    width: 100%;
`;

export const TData = styled(RowData)<{ width: string }>`
    width: ${(props) => props.width};
    background: none;
    p {
        font-family: ${(props) => props.theme.typography.family.primary};
        font-weight: ${(props) => props.theme.typography.weight.regular};
    }
`;