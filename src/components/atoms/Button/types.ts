import React from "react";

import { ButtonType } from "@/types";

export interface IProps {
  label: string | React.ReactNode;
  type: ButtonType;
  handlePress: (e: React.MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  formSubmit?: boolean;
  noFocus?: boolean;
  useMaxWidth?: boolean;
}
