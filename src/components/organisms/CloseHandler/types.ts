import React from "react";

export interface IProps {
  active: boolean;
  handler: () => void;
  children: React.ReactNode;
}
