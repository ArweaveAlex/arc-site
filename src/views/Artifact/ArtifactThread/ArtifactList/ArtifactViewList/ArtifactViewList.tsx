import { useQuery } from "hooks/useQuery";

import { ArtifactMessagingList } from "./ArtifactMessagingList";

import { Query } from "wrappers/Query";

import { ArtifactEnum } from "helpers/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactViewList(props: IProps) {
  const query = useQuery();

  function getArtifactList() {
    switch (query.get("type")) {
      case ArtifactEnum.Messaging:
        return (
          <ArtifactMessagingList
            data={props.data}
            loading={props.loading}
            updateSequence={props.updateSequence}
            updateDisabled={props.updateDisabled}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Query value={"type"} check={[ArtifactEnum.Messaging, ArtifactEnum.Nostr]}>
      <S.Wrapper>{getArtifactList()}</S.Wrapper>
    </Query>
  );
}
