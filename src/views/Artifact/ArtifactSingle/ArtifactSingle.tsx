import React from "react";

import { ArtifactHeaderSingle } from "./ArtifactHeaderSingle";
import { ArtifactActionsSingle } from "./ArtifactActionsSingle";
import { ArtifactDetailSingle } from "./ArtifactDetailSingle";
import { ArtifactViewSingle } from "./ArtifactViewSingle";

import { Loader } from "components/atoms/Loader";

import {
  ARTIFACT_TABS,
  ARTIFACT_TYPES,
  TAB_OPTIONS,
  TAGS,
} from "helpers/config";
import { checkNullValues } from "helpers/utils";
import { ArtifactDetailType } from "helpers/types";
import { LANGUAGE } from "helpers/language";
import * as S from "./styles";
import { IProps } from "./types";

export default function ArtifactSingle(props: IProps) {
  const [data, setData] = React.useState<ArtifactDetailType | null>(null);
  const [currentTab, setCurrentTab] = React.useState<string>(
    ARTIFACT_TABS[0]!.label
  );

  React.useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  function handleTabClick(label: string) {
    setCurrentTab(label);
  }

  function getArtifactType() {
    if (data) {
      let artifactType = ARTIFACT_TYPES[data.artifactType];
      if (artifactType) {
        return artifactType;
      } else {
        return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
      }
    } else {
      return null;
    }
  }

  function getArtifact() {
    if (data) {
      switch (currentTab) {
        case TAB_OPTIONS.view:
          return <ArtifactViewSingle data={data} />;
        case TAB_OPTIONS.details:
          return <ArtifactDetailSingle data={data} type={getArtifactType()} />;
        default:
          return <ArtifactDetailSingle data={data} type={getArtifactType()} />;
      }
    } else {
      return <Loader />;
    }
  }

  function validateData() {
    if (data) {
      return !checkNullValues(data);
    } else {
      return false;
    }
  }

  function getData() {
    if (validateData()) {
      return (
        <S.Wrapper>
          <S.Content>
            <ArtifactHeaderSingle
              data={data}
              type={getArtifactType()}
              onTabPropClick={(label: string) => handleTabClick(label)}
            />
            <ArtifactActionsSingle data={data} />
            <S.FlexWrapper>
              <S.ArtifactWrapper>{getArtifact()}</S.ArtifactWrapper>
            </S.FlexWrapper>
          </S.Content>
        </S.Wrapper>
      );
    } else {
      return (
        <S.MessageContainer>
          <p>{LANGUAGE.errorFetchingArtifact}</p>
        </S.MessageContainer>
      );
    }
  }

  return data ? <>{getData()}</> : <Loader />;
}
