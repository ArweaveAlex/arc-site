import React from "react";
import { Portal } from "../Portal";

import * as S from "./styles";
import { DOM } from "config";
import { IProps } from "./types";

import * as window from "window";

export default function Loader(props: IProps) {
  React.useEffect(() => {
    if (!props.sm) {
      window.scrollTo(0, 0);
      window.hideDocumentBody();
    }
    return () => {
      window.showDocumentBody();
    };
  }, [props.sm]);

  function getLoader(size: number, height: number, width: number) {
    return (
      <S.Container>
        <S.Spinner size={size} height={height} width={width}>
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
          <S.Blade />
        </S.Spinner>
      </S.Container>
    )
  }

  if (props.sm) {
    return (
      <>{getLoader(20.75, 6.25, 1.75)}</>
    );
  }

  return (
    <Portal node={DOM.loader}>
      <S.Wrapper>
        {getLoader(27.5, 7.5, 2.25)}
      </S.Wrapper>
    </Portal>
  );
}
