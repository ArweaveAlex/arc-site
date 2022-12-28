import styled, { DefaultTheme } from "styled-components";

import { NotificationType } from "config/types";

import { open, fadeIn1 } from "config/animations";

type NotificationProps = {
  type: NotificationType;
};

function getColor(m: NotificationType, theme: DefaultTheme) {
  switch (m) {
    case "success":
      return theme.colors.notification.success;
    case "warning":
      return theme.colors.notification.warning;
    case "neutral":
      return theme.colors.notification.neutral;
    default:
      return theme.colors.notification.neutral;
  }
}


export const Wrapper = styled.div`
  height: 55px;
  width: 555px;
  max-width: 90vw;
  background: ${(props) => props.theme.colors.container.primary.background};
  border: 1px solid ${(props) => props.theme.colors.border.alt1};
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);
  z-index: 12;
  animation: ${open} ${fadeIn1};
  display: flex;
  align-items: center;
`;

export const Message = styled.span<NotificationProps>`
  color: ${(props) => props.theme.colors.font.primary.alt1};
  font-weight: ${(props) => props.theme.typography.weight.medium};
  margin-left: 20px;
  border-left: 3.5px solid ${(props) => getColor(props.type, props.theme)};
  padding-left: 7.5px;
`;

export const Close = styled.div`
  height: 100%;
  width: 50px;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5px 0 0 0;
`;
