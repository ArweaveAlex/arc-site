import React from "react";

import { FormFieldType, ValidationType } from "@/types";

export interface IProps {
  label?: string;
  value: number | string;
  type?: FormFieldType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  endText?: string;
  error?: string | null;
  invalid: ValidationType;
}
