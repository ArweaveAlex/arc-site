import styled from "styled-components";

import { STYLING } from "config/styling";

export const Wrapper = styled.div`
    display: flex;
`;

export const SearchWrapper = styled.div`
    height: ${STYLING.dimensions.formHeightMin};
    width: ${STYLING.dimensions.formWidthMax};
    display: flex;
    position: relative;
`;

export const SearchIcon = styled.div`
    svg {
        position: absolute;
        top: 10px;
        left: 14.5px;
        width: 15px;
        fill ${(props) => props.theme.colors.icon.primary.alt1.fill};
    }
`;

export const SearchInput = styled.input`
    height: ${STYLING.dimensions.formHeightMin};
    width: 100%;
    font-size: 14px;
    font-weight: ${(props) => props.theme.typography.weight.medium};
    border: 1px solid ${(props) => props.theme.colors.form.border};
    border-radius: ${STYLING.dimensions.borderRadiusInput};
    padding: 10px 15px 10px 40px;
    &:focus {
        outline: 0;
        border: 1px solid
            ${(props) => props.theme.colors.form.valid.outline};
        box-shadow: 0 0 2px 1px
            ${(props) => props.theme.colors.form.valid.shadow};
        transition: box-shadow, border 225ms ease-in-out;
    }
    &:disabled {
        background: ${(props) => props.theme.colors.form.disabled.background};
        color: ${(props) => props.theme.colors.form.disabled.label};
    }
`;

export const CloseWrapper = styled.div`
    button {
        width: auto;
    }
    svg {
        position: absolute;
        right: 14.5px;
        width: 12.5px;
        height: auto;
        top: 50.5%;
        transform: translate(0, -50%);
    }
`;