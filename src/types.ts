import React from "react";

export enum ArtifactEnum {
  Messaging = "Alex-Messaging",
  Webpage = "Alex-Webpage"
}

export interface ArtifactType {
  artifactType: ArtifactEnum.Messaging | ArtifactEnum.Webpage,
  dataUrl: string;
  rawData: string
}

export interface CollectionType {
  id: string;
  state: CollectionStateType;
}

export interface CollectionStateType {
  title: string;
  image: string;
  briefDescription: string;
  description: string;
  link: string;
  ownerInfo: string;
  timestamp: string;
  contributors: { [key: string]: string };
  tokens: { [key: string]: string };
  totalContributions: string;
  totalSupply: string;
  balance: string;
}

export type ButtonType = "primary" | "secondary" | "tertiary";
export type FormFieldType = "number" | "password";
export type NotificationType = "success" | "warning" | "neutral";
export type AlignType = "left" | "center" | "right";
export type ContributionResultType = { status: boolean, message: string | null };
export type RefType = { current: HTMLElement };
export type DateType = "iso" | "epoch";

export interface IURLView {
  account: URLViewType[]
}

export type URLViewType = {
  index: number;
  label: string;
  icon: string;
  disabled: boolean;
  url: string;
  view: React.ComponentType;
}

export type ValidationType = {
  status: boolean,
  message: string | null
}

export type KeyValueType = { [key: string]: string | React.ReactNode };
export type TableHeaderType = { [key: string]: { width: string, align: AlignType } };

export type ArtifactTableRowType = { 
  title: React.ReactNode, 
  dateCreated: string, 
  bookmark?: React.ReactNode
};

export type ArtifactQueryType = {
  cursor: string;
  node: {
    id: string,
    tags: KeyValueType[]
  }
}