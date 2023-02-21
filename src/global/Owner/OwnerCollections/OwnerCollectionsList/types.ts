import { CollectionType } from "helpers/types";

export interface IProps {
  owner: string | null;
  data: CollectionType[] | null;
  showCreateCollections: boolean;
}
