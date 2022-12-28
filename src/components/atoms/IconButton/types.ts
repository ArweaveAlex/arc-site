import { ButtonType } from "config/types";

export interface IProps {
  src: string;
  type: ButtonType;
  handlePress: () => void;
  sm?: boolean;
  warning?: boolean;
  disabled?: boolean;
  testingCtx?: string;
}
