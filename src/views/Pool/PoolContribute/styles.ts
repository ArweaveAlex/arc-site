import styled from "styled-components";

import { STYLING } from "styling-config";

export const Wrapper = styled.button`
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.colors.button.secondary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt2};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: ${(props) => props.theme.colors.button.secondary.hover};
    }
    &:focus {
      background: ${(props) => props.theme.colors.button.secondary.hover};
    }
`;

export const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 30px;
        margin: 0 20px 0 0;
    }
    span {
        font-size: 24px;
        color: ${(props) => props.theme.colors.font.primary.base};
        font-family: ${(props) => props.theme.typography.family.secondary};
    }
`;

export const ModalWrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
`;

export const Header = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        height: auto;
    }
`;

export const HeaderFlex = styled.div`
    display: flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        width: fit-content;
        flex-direction: column;
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

export const BalanceWrapper = styled.div`
    display: flex;
    margin: 20px 0 0 0;
`;

export const AvailableBalance = styled.p`
    color: ${(props) => props.theme.colors.font.primary.alt1};
    line-height: 18px;
`;

export const BalanceAmount = styled.p`
    color: ${(props) => props.theme.colors.font.primary.alt1};
    font-size: 18px;
    font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const ARTokens = styled.p`
    color: ${(props) => props.theme.colors.font.primary.alt4};
    font-size: 18px;
    font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const Form = styled.form`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const FormWrapper = styled.div``;

export const FormField = styled.div`
    width: ${STYLING.dimensions.formWidth};
    margin: 50px auto 0 auto;
`;

export const SubmitWrapper = styled.div`
    margin: 15px auto;
    button {
        width: fit-content;
        margin: 0 auto;
    }
`;

export const RPWrapper = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    margin: 0 auto;
    span, p {
        font-size: ${(props) => props.theme.typography.size.xSmall};
    }
    span {
        color: ${(props) => props.theme.colors.font.primary.alt7};
    }
    p {
        font-weight: ${(props) => props.theme.typography.weight.medium};
    }
`;

export const Message = styled.div`
    width: 100%;
    margin: 12.5px auto 0 auto;
    text-align: center;
    p {
        font-size: 12px;
        line-height: 1.5;
        color: ${(props) => props.theme.colors.font.primary.alt4};
    }
`;