export interface ArtefactBundlrProps {
  data: Data;
}

export interface Data {
  transaction: Transaction;
}

export interface Transaction {
  id:    string;
  owner: Owner;
  tags:  Tag[];
}

export interface Owner {
  address: string;
}

export interface Tag {
  name:  string;
  value: string;
}
