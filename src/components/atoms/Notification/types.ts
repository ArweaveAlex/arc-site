import { NotificationType } from "@/types";

export interface IProps {
  message: string;
  type: NotificationType;
  callback: () => void;
}
