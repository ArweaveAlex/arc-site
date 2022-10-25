import React from "react";
import { Portal } from "../Portal";

import * as S from "./styles";
import { DOM } from "@/config";
import { IProps } from "./types";

import * as window from "@/window";

export default function Loader(props: IProps) {
  React.useEffect(() => {
    if (!props.alt) {
      window.scrollTo(0, 0);
      window.hideDocumentBody();
    }
    return () => {
      window.showDocumentBody();
    };
  }, []);

  if (props.alt) {
    return (
      <S.AltContainer>
        <S.AltLoader />
      </S.AltContainer>
    );
  }

  return (
    <Portal node={DOM.loader}>
      <S.Wrapper>
        <S.Container>
          <S.Spinner>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
            <S.Blade></S.Blade>
          </S.Spinner>
        </S.Container>
      </S.Wrapper>
    </Portal>
  );
}
