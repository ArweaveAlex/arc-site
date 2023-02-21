import { KeyValueType } from "helpers/types";

export interface IProps {
  artifactId: string;
  tags: KeyValueType[];
  owner: string | null;
  bookmarksDisabled: boolean;
  handleStampCallback: () => void;
  handleViewedCallback: () => void;
  usePreviewModal: boolean;
}
