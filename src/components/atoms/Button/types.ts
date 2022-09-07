import React from "react";

import { ButtonType } from "@/types";

export interface IProps {
  formSubmit?: boolean;
  noFocus?: boolean;
  label: string | React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type: ButtonType;
  handlePress: (e: React.MouseEvent) => void;
}
