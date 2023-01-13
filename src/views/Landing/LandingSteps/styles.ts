import styled from "styled-components";

import { open, fadeIn2 } from "helpers/animations";
import { STYLING } from "helpers/styling";

export const Wrapper = styled.div`
    width: 100%;
`;

export const Content = styled.div`
    width: 100%;
    max-width: ${STYLING.cutoffs.max};
    margin: 0 auto 40px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${open} ${fadeIn2};
`;

export const Header = styled.div`
    height: 175px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
        padding: 0 35px;
        margin: 20px 0 0 0;
    }
    @media(max-width: ${STYLING.cutoffs.secondary}) {
        padding: 0 20px;
    }
`;

export const H2 = styled.h2`
    font-size: 28px;
    line-height: 1.25;
    text-align: center;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        font-size: 24px;
    }
`;

export const Header1 = styled(H2)`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-family: ${(props) => props.theme.typography.family.secondary};
`;

export const HeaderFlex = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px 0;
    width: 67.5%;
    max-width: 1200px;
    text-align: center;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
        padding: 0 20px;
        flex-direction: column;
        margin: 0 0 20px 0;
    }
`;

export const Header2 = styled.p`
    font-size: 18px;
    line-height: 1.295;
    text-align: center;
    margin: 20px 0 0 0;
    color: ${(props) => props.theme.colors.font.primary.alt4};
    b {
        font-size: 18px;
        margin: 20px 0 0 0;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        line-height: 1.5;
        margin: 40px 0 0 0;
    }
`;

export const Body = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    padding: 20px;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        flex-direction: column;
    }
`;


export const Asset = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    img {
        width: 67.5%;
        margin: 0 0 0 auto;
    }
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
        margin: 0 0 50px 0;
        img {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
        }
    }
`;

export const StepList = styled.div`
    height: 100%;
    width: 50%;
    padding: 0 0 0 50px;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: 100%;
        padding: 0;
    }
`;

export const Step = styled.div`
    margin: 0 0 25px 0;
`;

export const StepHeader = styled.p`
    color: ${(props) => props.theme.colors.font.primary.alt2};
    font-weight: ${(props) => props.theme.typography.weight.medium};
    font-size: ${(props) => props.theme.typography.size.base};
    margin: 0 0 7.5px 0;
`;

export const StepBody = styled.div`
    color: ${(props) => props.theme.colors.font.primary.active.base};
    font-size: ${(props) => props.theme.typography.size.base};
    line-height: 1.5;
    b {
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-weight: ${(props) => props.theme.typography.weight.medium};
        font-size: ${(props) => props.theme.typography.size.base};
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-size: ${(props) => props.theme.typography.size.base};
        text-decoration: underline;
    }
`;