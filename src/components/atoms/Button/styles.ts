import styled from "styled-components";

import { STYLING } from "config/styling";

export const Primary = styled.button<{ 
  useMaxWidth: boolean | undefined, 
  noMinWidth: boolean | undefined,
  active: boolean | undefined 
}>`
  position: relative;
  background: ${(props) => props.active ? 
    props.theme.colors.button.primary.active.background : props.theme.colors.button.primary.background};
  border: 1.5px solid ${(props) => props.theme.colors.button.primary.border};
  height: ${STYLING.dimensions.buttonHeight};
  min-width: ${(props) => props.noMinWidth ? 
    "none" : STYLING.dimensions.buttonWidth};
  max-width: ${(props) => props.useMaxWidth ? 
    STYLING.dimensions.buttonWidth : "none"};
  overflow-x: hidden;
  text-overflow: ellipsis;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${STYLING.dimensions.borderRadiusInput};
  &:hover {
    border: 1.5px solid ${(props) => props.active ? 
      "transparent" : props.theme.colors.button.primary.border};
    background: ${(props) => props.active ? 
      props.theme.colors.button.primary.active.hover : props.theme.colors.button.primary.hover};
  }
  &:focus {
    border: 1.5px solid ${(props) => props.active ? 
      "transparent" : props.theme.colors.button.primary.border};
    background: ${(props) => props.active ? 
      props.theme.colors.button.primary.active.hover : props.theme.colors.button.primary.hover};
  }
  &:disabled {
    background: ${(props) => props.theme.colors.button.primary.disabled.background};
    color: ${(props) => props.theme.colors.button.primary.disabled.label};
    border: 1.5px solid ${(props) => props.theme.colors.button.primary.disabled.border};
    span {
      color: ${(props) => props.theme.colors.button.primary.disabled.label};
    }
  }
  span {
    width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
    font-size: ${(props) => props.theme.typography.size.xSmall};
    color: ${(props) => props.active ? 
      props.theme.colors.button.primary.active.label : props.theme.colors.button.primary.label};
  }
`;

export const IconPrimary = styled.div<{ 
  active: boolean, 
  disabled: boolean,
  leftAlign: boolean
}>`
  svg {
    height: 20px;
    width: 15px;
    margin: ${(props) => props.leftAlign ? "0 12.5px 0 0" : "0 0 0 12.5px"};
    padding: 3.5px 0 0 0;
    fill: ${(props) => props.disabled ?
    props.theme.colors.button.primary.disabled.label : props.active ? 
    props.theme.colors.button.primary.active.label : props.theme.colors.button.primary.label};
  }
`;

export const Secondary = styled(Primary)`
    background: ${(props) => props.active ? 
      props.theme.colors.button.secondary.active.background : props.theme.colors.button.secondary.background};
    border: 1.5px solid ${(props) => props.theme.colors.button.secondary.border};
    &:hover {
      border: 1.5px solid ${(props) => props.active ? 
        "transparent" : props.theme.colors.button.secondary.border};
      background: ${(props) => props.active ? 
        props.theme.colors.button.secondary.active.hover : props.theme.colors.button.secondary.hover};
    }
    &:focus {
      border: 1.5px solid ${(props) => props.active ? 
        "transparent" : props.theme.colors.button.secondary.border};
      background: ${(props) => props.active ? 
        props.theme.colors.button.secondary.active.hover : props.theme.colors.button.secondary.hover};
    }
    &:disabled {
      background: ${(props) => props.theme.colors.button.secondary.disabled.background};
      color: ${(props) => props.theme.colors.button.secondary.disabled.label};
      border: 1.5px solid ${(props) => props.theme.colors.button.secondary.disabled.border};
      span {
        color: ${(props) => props.theme.colors.button.secondary.disabled.label};
      }
    }
    span {
      color: ${(props) => props.active ? 
        props.theme.colors.button.secondary.active.label : props.theme.colors.button.secondary.label};
    }
`;

export const IconSecondary = styled(IconPrimary)`
  svg {
      fill: ${(props) => props.disabled ?
      props.theme.colors.button.secondary.disabled.label : props.active ? 
      props.theme.colors.button.secondary.active.label : props.theme.colors.button.secondary.label};
  }
`;

export const Tertiary = styled(Primary)`
  background: ${(props) => props.active ? 
    props.theme.colors.button.tertiary.active.background : props.theme.colors.button.tertiary.background};
  border: 1.5px solid ${(props) => props.theme.colors.button.tertiary.border};
  &:hover {
    border: 1.5px solid ${(props) => props.active ? 
      "transparent" : props.theme.colors.button.tertiary.border};
    background: ${(props) => props.active ? 
      props.theme.colors.button.tertiary.active.hover : props.theme.colors.button.tertiary.hover};
  }
  &:focus {
    border: 1.5px solid ${(props) => props.active ? 
      "transparent" : props.theme.colors.button.tertiary.border};
    background: ${(props) => props.active ? 
      props.theme.colors.button.tertiary.active.hover : props.theme.colors.button.tertiary.hover};
  }
  &:disabled {
    background: ${(props) => props.theme.colors.button.tertiary.disabled.background};
    color: ${(props) => props.theme.colors.button.tertiary.disabled.label};
    border: 1.5px solid ${(props) => props.theme.colors.button.tertiary.disabled.border};
    span {
      color: ${(props) => props.theme.colors.button.tertiary.disabled.label};
    }
  }
  span {
    color: ${(props) => props.active ? 
      props.theme.colors.button.tertiary.active.label : props.theme.colors.button.tertiary.label};
  }
`;
export const IconTertiary = styled(IconPrimary)`
  svg {
    fill: ${(props) => props.disabled ?
    props.theme.colors.button.tertiary.disabled.label : props.active ? 
    props.theme.colors.button.tertiary.active.label : props.theme.colors.button.tertiary.label};
  }
`;