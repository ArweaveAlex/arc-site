import React from "react";

import { CloseHandler } from "wrappers/CloseHandler";

import { IconButton } from "components/atoms/IconButton";

import { LANGUAGE } from "helpers/language";
import { ASSETS } from "helpers/config";
import { IProps } from "./types";
import * as S from "./styles";

export default function ActionDropdown(props: IProps) {
  const dropdownHeight = 32.5 * props.actions.length + 10;

  const escFunction = React.useCallback(
    (e: any) => {
      if (e.key === "Escape" && props.open && !props.closeDisabled) {
        props.handleCallback();
      }
    },
    [props]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  function handleCallback() {
    if (!props.closeDisabled) {
      props.handleCallback();
    }
  }

  function handleShowDropdown(e: any) {
    if (!props.closeDisabled) {
      props.handleShowDropdown();
    }
  }

  function runAction(action: () => void, closeOnAction: boolean) {
    action();
    if (closeOnAction) {
      props.handleCallback();
    }
  }

  return (
    <CloseHandler
      callback={() => handleCallback()}
      active={props.open}
      disabled={props.closeDisabled}
    >
      <S.Wrapper>
        <IconButton
          type={"primary"}
          src={ASSETS.menuAction}
          handlePress={(e: any) => handleShowDropdown(e)}
        />
        {props.open && (
          <S.Dropdown openDown={true} height={dropdownHeight}>
            {props.actions.map((action, index) => {
              return (
                <S.Container key={index}>
                  {action.subComponent &&
                    action.subComponent.active &&
                    action.subComponent.node}
                  <S.LI
                    disabled={action.disabled || action.loading}
                    onClick={() => runAction(action.fn, action.closeOnAction)}
                  >
                    {action.loading ? `${LANGUAGE.loading} ...` : action.label}
                  </S.LI>
                </S.Container>
              );
            })}
          </S.Dropdown>
        )}
      </S.Wrapper>
    </CloseHandler>
  );
}
