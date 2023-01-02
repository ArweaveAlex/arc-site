import styled from "styled-components";

import { STYLING } from "config/styling";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const Info = styled.div<{ secondary: boolean }>`
    display: flex;
    margin: ${(props) => props.secondary ? "0px 5px 0 0" : "5.5px 5px 0 0"};
    p {
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-size: ${(props) => props.secondary ? "12px" : props.theme.typography.size.xSmall};
    }
    svg {
        fill: ${(props) => props.theme.colors.font.primary.alt7};
        width: 12.5px;
        margin: -1.75px 5px 0 0;
    }
`;

export const Actions = styled.div`
   display: flex;
   position: relative;
    > * {
        margin: 0 0 0 10px;
    }
`;

export const Icon = styled.div<{ secondary: boolean }>`
  height: 32.5px;
  width: 32.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 0 0 0;
  background: ${(props) => props.secondary ?
        props.theme.colors.transparent : props.theme.colors.button.secondary.background};
  border-radius: ${STYLING.dimensions.borderRadiusField};
  &:hover {
    background: ${(props) => props.secondary ?
        props.theme.colors.transparent : props.theme.colors.button.secondary.hover};
    cursor: pointer;
    svg {
        opacity: ${(props) => props.secondary ? "0.75" : "1"};
    }
  }

  svg {
    height: 17.5px;
    width: 17.5px;
    fill:  ${(props) => props.secondary ?
        props.theme.colors.icon.secondary.fill : props.theme.colors.button.secondary.label};
  }
`;

export const URLCopied = styled.div`
    position: absolute;
    bottom: 100%;
    right: 90%;
    z-index: 5;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.alt1};
    padding: 6.5px 15px 5px 15px;
    p {
        font-size: 12px;
        color: ${(props) => props.theme.colors.font.primary.alt4};
        white-space: nowrap;
    }
    @media(max-width: ${STYLING.cutoffs.tablet}) {
        bottom: auto;
        right: auto;
        left: 82.5px;
    }
`;