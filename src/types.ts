import React from "react";
import { BookmarksType } from "redux/artifacts/types";

export enum ArtifactEnum {
  Messaging = "Alex-Messaging",
  Webpage = "Alex-Webpage"
}

export interface ArtifactType {
  artifactName: string,
  artifactType: ArtifactEnum.Messaging | ArtifactEnum.Webpage,
  owner: string;
  ansTitle: string;
  minted: string;
  keywords: string;
  poolName: string;
  poolId: string;
  dataUrl: string;
  dataSize: string;
  rawData: string;
}

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
export type PageShareType = "primary" | "secondary";
export type CursorType =  {
  next: string | null,
  previous: string | null
}
export type NStringType = string | null;
export type NStringListType = string[] | null;

export type URLViewType = {
  index: number;
  label: string;
  icon: string;
  disabled: boolean;
  url: any;
  view: React.ComponentType;
}

export interface IURLView {
  account: URLViewType[];
  library: URLViewType[];
}


export type ValidationType = {
  status: boolean,
  message: string | null
}

export type KeyValueType = { [key: string]: string | React.ReactNode };
export type TableHeaderType = { [key: string]: { width: string, align: AlignType } };

export type ArtifactTableRowType = {
  type: React.ReactNode,
  title: React.ReactNode,
  collectionId?: React.ReactNode,
  dateCreated?: string,
  bookmark?: React.ReactNode
};

export type ReduxActionType = {
  type: string;
  payload: BookmarksType;
};

export type BookmarkResponseType = {
  status: number | null,
  message: string | null
}