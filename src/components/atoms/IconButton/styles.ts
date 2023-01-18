import styled from "styled-components/macro";

import { STYLING } from "helpers/styling";

export const Primary = styled.button<{
  sm: boolean | undefined,
  warning: boolean | undefined,
  disabled: boolean | undefined
}>`
  height: auto;
  width: ${(props) => props.sm ? "15px" : "17.5px"};
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;

  &:focus {
    outline: none;
    svg {
      opacity: ${(props) => props.disabled ? "1" : "0.75"};
    }
  }
  
  svg {
    height: 100%;
    width: 100%;
    fill: ${(props) => props.warning ?
    (props.disabled ?
      props.theme.colors.icon.inactive : props.theme.colors.warning) : props.theme.colors.icon.inactive};
    
    &:hover {
      cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
      opacity: ${(props) => props.disabled ? "1" : "0.75"};
    }
  }
`;

export const Alt1 = styled(Primary) <{ dimensions: { wrapper: number, icon: number } | undefined }>`
  height: ${(props) => props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `32.5px`};
  width: ${(props) => props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `32.5px`};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 0 0 0;
  background: ${(props) => props.theme.colors.button.alt1.background};
  border-radius: ${STYLING.dimensions.borderRadiusField};
  position: relative;

  &:hover {
    background: ${(props) => props.theme.colors.button.alt1.hover};
  }

  svg {
    height: ${(props) => props.dimensions ? `${props.dimensions.icon.toString()}px` : `17.5px`};
    width: ${(props) => props.dimensions ? `${props.dimensions.icon.toString()}px` : `17.5px`};
    fill: ${(props) => props.theme.colors.button.alt1.label};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    &:hover {
      cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
      opacity: 1;
    }
  }

  &:disabled {
    background: ${(props) => props.theme.colors.button.alt1.disabled.background};
    color: ${(props) => props.theme.colors.button.alt1.disabled.label};
    svg {
      fill: ${(props) => props.theme.colors.button.alt1.disabled.label};
    }
  }
`;

export const Alt2 = styled(Primary)`
  svg {
    fill: ${(props) => props.warning ?
    props.theme.colors.warning : props.theme.colors.icon.alt1.fill};
  }
`;