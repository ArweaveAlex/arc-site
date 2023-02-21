import React from "react";
import { Portal } from "../Portal";

import * as S from "./styles";
import { DOM } from "helpers/config";
import { IProps } from "./types";

import * as window from "helpers/window";

export default function Loader(props: IProps) {
  React.useEffect(() => {
    if (!props.sm && !props.xSm) {
      window.scrollTo(0, 0);
      window.hideDocumentBody();
      return () => {
        window.showDocumentBody();
      };
    }
  }, [props.sm, props.xSm]);

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
    );
  }

  if (props.sm) {
    return <>{getLoader(19.75, 6, 2)}</>;
  }

  if (props.xSm) {
    return <>{getLoader(16.5, 5.5, 1.95)}</>;
  }

  return (
    <Portal node={DOM.loader}>
      <S.Wrapper>{getLoader(27.5, 7.5, 2.65)}</S.Wrapper>
    </Portal>
  );
}
