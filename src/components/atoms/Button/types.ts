import React from "react";

import { ButtonType } from "@/types";

export interface IProps {
  label: string | number | React.ReactNode;
  type: ButtonType;
  handlePress: (e: React.MouseEvent) => void;
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  icon?: string;
  iconLeftAlign?: boolean;
  formSubmit?: boolean;
  noFocus?: boolean;
  useMaxWidth?: boolean;
  noMinWidth?: boolean;
}
