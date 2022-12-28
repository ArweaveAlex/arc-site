import { ReactSVG } from "react-svg";

import { LANGUAGE } from "config/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function Button(props: IProps) {
  const buttonStyle = getType();
  const StyledButton = buttonStyle.wrapper;
  const StyledIcon = buttonStyle.icon;

  function getType() {
    let buttonObj: {
      wrapper: any;
      icon: any;
    };
    switch (props.type) {
      case "secondary":
        buttonObj = {
          wrapper: S.Secondary,
          icon: S.IconSecondary
        };
        return buttonObj;
      case "tertiary":
        buttonObj = {
          wrapper: S.Tertiary,
          icon: S.IconTertiary
        };
        return buttonObj;
      default:
        buttonObj = {
          wrapper: S.Primary,
          icon: S.IconPrimary
        };
        return buttonObj;
    }
  }

  function getLabel() {
    return (
      <>
      {(props.icon && props.iconLeftAlign) &&
          <StyledIcon disabled={props.disabled} active={props.active} leftAlign={props.iconLeftAlign}>
            <ReactSVG src={props.icon}/>
          </StyledIcon>
        }
        <span>{props.label}</span>
        {(props.icon && !props.iconLeftAlign) &&
          <StyledIcon disabled={props.disabled} active={props.active} leftAlign={props.iconLeftAlign}>
            <ReactSVG src={props.icon}/>
          </StyledIcon>
        }
      </>
    )
  }

  return (
    <StyledButton
      tabIndex={props.noFocus ? -1 : 0}
      type={props.formSubmit ? "submit" : "button"}
      onClick={props.handlePress}
      onKeyPress={props.handlePress}
      disabled={props.disabled}
      active={props.active}
      useMaxWidth={props.useMaxWidth}
      noMinWidth={props.noMinWidth}
      data-testid={props.testingCtx}
    >
      {props.loading ? `${LANGUAGE.loading}...` : getLabel()}
    </StyledButton>
  );
}
