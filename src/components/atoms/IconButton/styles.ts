import styled from "styled-components";

import { STYLING } from "config/styling";

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

export const Secondary = styled(Primary)`
  height: 32.5px;
  width: 32.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 0 0 0;
  background: ${(props) => props.theme.colors.button.secondary.background};
  border-radius: ${STYLING.dimensions.borderRadiusInput};

  &:hover {
    background: ${(props) => props.theme.colors.button.secondary.hover};
  }

  svg {
    height: 17.5px;
    width: 17.5px;
    fill: ${(props) => props.theme.colors.button.secondary.label};
    
    &:hover {
      cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
      opacity: 1;
    }
  }

  &:disabled {
    background: ${(props) => props.theme.colors.button.secondary.disabled.background};
    color: ${(props) => props.theme.colors.button.secondary.disabled.label};
    svg {
      fill: ${(props) => props.theme.colors.button.secondary.disabled.label};
    }
  }
`;

export const Tertiary = styled(Primary)`
  svg {
    fill: ${(props) => props.warning ?
      props.theme.colors.warning : props.theme.colors.icon.secondary.fill};
  }
`;