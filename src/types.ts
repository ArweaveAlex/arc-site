export type ButtonType = "primary" | "secondary";

export interface ArweaveCollectionProps {
    state: ArweaveCollectionState;
    id: string;
    artefacts: number;
    lastCursor: string;
  }
  
  export interface ArweaveCollectionState {
    title: string;
    image: string;
    shortDescription: string;
    longDescription: string;
    dateCreated: string;
    link: string;
    ownerInfo: string;
    contributors: { [key: string]: string };
    tokens: { [key: string]: string };
    totalContributions: string;
    totalSupply: string;
    balance: string;
  }