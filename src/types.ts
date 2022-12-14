import React from "react";

export enum ArtifactEnum {
  Messaging = "Alex-Messaging",
  Webpage = "Alex-Webpage"
}

export type GQLResponseType = {
  cursor: string | null
  node: {
    id: string
    tags: KeyValueType[]
    data: {
      size: string
      type: string
    }
  }
}

export interface ArtifactType {
  artifactName: NStringType
  artifactType: ArtifactEnum.Messaging | ArtifactEnum.Webpage
  owner: NStringType
  ansTitle: NStringType
  minted: NStringType
  keywords: NStringType
  poolName: NStringType
  mediaIds: NStringType
  poolId: NStringType
  dataUrl: NStringType
  dataSize: NStringType
  rawData: NStringType
}

export type ArtifactArgsType = {
  poolIds: string[] | null
  owner: string | null
  uploader: string | null
  cursor: string | null
  reduxCursor: string | null
}

export type ArtifactResponseType = {
  nextCursor: string | null
  previousCursor: string | null
  contracts: GQLResponseType[]
}

export interface PoolType {
  id: string
  state: PoolStateType
}

export interface PoolStateType {
  title: string
  image: string
  briefDescription: string
  description: string
  link: string
  owner: string
  ownerInfo: string
  timestamp: string
  contributors: { [key: string]: string }
  tokens: { [key: string]: string }
  totalContributions: string
  totalSupply: string
  balance: string
}

export type ButtonType = "primary" | "secondary" | "tertiary"
export type FormFieldType = "number" | "password"
export type NotificationType = "success" | "warning" | "neutral"
export type AlignType = "left" | "center" | "right"
export type ContributionResultType = { status: boolean, message: string | null }
export type RefType = { current: HTMLElement }
export type DateType = "iso" | "epoch"
export type PageShareType = "primary" | "secondary"
export type CursorType = {
  next: string | null,
  previous: string | null
}
export type NStringType = string | null
export type NStringListType = string[] | null

export type URLViewType = {
  index: number
  label: string
  icon: string
  disabled: boolean
  url: any
  view: React.ComponentType
}

export interface IURLView {
  account: URLViewType[]
  library: URLViewType[]
}

export type ValidationType = {
  status: boolean
  message: string | null
}

export type KeyValueType = { [key: string]: string | React.ReactNode }
export type TableHeaderType = { [key: string]: { width: string, align: AlignType } }

export type ArtifactTableRowType = {
  type: React.ReactNode
  title: React.ReactNode
  pool?: React.ReactNode
  dateCreated?: string
  bookmark?: React.ReactNode
}

export type ReduxActionType = {
  type: string
  payload: any
}

export type BookmarkResponseType = {
  status: number | null
  message: string | null
}

export type TagFilterType = { name: string, values: string[] }
export type ContributionType = { timestamp: string, qty: string }
export type PoolFilterType = { title: string, fn: (data: any) => any }