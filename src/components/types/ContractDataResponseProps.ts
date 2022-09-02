export interface ContractDataResponseProps {
  manifest: string;
  version: string;
  index: Index;
  paths: Paths;
}

export interface Index {
  path: string;
}

export interface Paths {
  [index: string]: {
    id: string;
  };
}

export interface MediaProps {
  id: string;
}
