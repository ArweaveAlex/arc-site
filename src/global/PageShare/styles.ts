import styled from "styled-components";

import { STYLING } from "styling-config";

export const Wrapper = styled.div``;

export const Info = styled.div`
    display: flex;
    p {
        color: ${(props) => props.theme.colors.font.primary.active.base};
        font-size: ${(props) => props.theme.typography.size.xSmall};
    }
    svg {
        fill: ${(props) => props.theme.colors.font.primary.alt7};
        width: 12.5px;
        margin: -1.75px 5px 0 0;
    }
`;

export const Actions = styled.div`
   display: flex;
   margin: 7.5px 0 0 0;
   position: relative;
    > * {
        margin: 0 10px 0 0;
    }
`;

export const Icon = styled.div`
  height: 32.5px;
  width: 32.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 0 0 0;
  background: ${(props) => props.theme.colors.button.secondary.background};

  &:hover {
    background: ${(props) => props.theme.colors.button.secondary.hover};
    cursor: pointer;
  }

  svg {
    height: 17.5px;
    width: 17.5px;
    fill: ${(props) => props.theme.colors.button.secondary.label};
  }
`;

export const LinkCopied = styled.div`
    position: absolute;
    bottom: 100%;
    right: 100%;
    background: ${(props) => props.theme.colors.container.primary.background};
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
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