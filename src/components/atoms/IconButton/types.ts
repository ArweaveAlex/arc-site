import { ButtonType } from "types";

export interface IProps {
  src: string;
  type: ButtonType;
  handlePress: () => void;
  sm?: boolean;
  warning?: boolean;
  disabled?: boolean;
}
