import { NotificationType } from "config/types";

export interface IProps {
  message: string;
  type: NotificationType;
  callback: () => void;
}
