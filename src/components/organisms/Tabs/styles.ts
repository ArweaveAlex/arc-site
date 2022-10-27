import styled from "styled-components";

import { STYLING } from "@/styling-config";

export const Container = styled.div`
  height: fit-content;
`;

export const List = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  height: 25px;
`;

export const Content = styled.div`
  height: calc(100% - 25px);
  position: relative;
`;

export const Tab = styled.div<{ active: boolean }>`
  margin: 0 15px 0 0;
  font-size: ${(props) => props.theme.typography.size.small};
  border-bottom: ${(props) =>
    props.active
      ? `2px solid ${props.theme.colors.tabs.active}`
      : `2px solid ${props.theme.colors.tabs.inactive}`};

  font-weight: ${(props) => props.theme.typography.weight.medium};
  color: ${(props) =>
    props.active
      ? props.theme.colors.font.primary.active.base
      : props.theme.colors.font.primary.alt1};
  border-bottom: ${(props) =>
    props.active
      ? `2px solid ${props.theme.colors.tabs.active}`
      : `2px solid ${props.theme.colors.tabs.inactive}`};
  cursor: pointer;
  padding-bottom: 23px;
  background: ${(props) =>
    props.active
      ? props.theme.colors.tabs.inactive
      : props.theme.colors.tabs.inactive};

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colors.tabs.active};
    background: ${(props) => props.theme.colors.tabs.inactive};
    color: ${(props) => props.theme.colors.font.primary.active.base};
  }
`;
