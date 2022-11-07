import React from "react";
import { BookmarksType } from "redux/artifacts/types";

export enum ArtifactEnum {
  Messaging = "Alex-Messaging",
  Webpage = "Alex-Webpage"
}

export interface ArtifactType {
  artifactName: string,
  artifactType: ArtifactEnum.Messaging | ArtifactEnum.Webpage,
  archivist: string;
  ansTitle: string;
  minted: string;
  keywords: string;
  poolName: string;
  poolId: string;
  dataUrl: string;
  dataSize: string;
  rawData: string;
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
export type CursorType =  {
  next: string | null,
  previous: string | null
}
export type NStringType = string | null;
export type NStringListType = string[] | null;

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

export type ArtifactArgsType = {
  poolIds: string[],
  cursor: string | null,
  owner: string | null
}

export type ArtifactResponseType = {
  nextCursor: string | null,
  previousCursor: string | null,
  contracts: ArtifactQueryType[],
  count: number | null
}

export type ReduxActionType = {
  type: string;
  payload: BookmarksType;
};