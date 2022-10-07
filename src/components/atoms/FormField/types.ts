import React from "react";

import { ValidationType } from "../../../types";

export interface IProps {
  label?: string;
  value: number | string;
  type?: "number" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  endText?: string;
  error?: string | null;
  invalid: ValidationType;
}
