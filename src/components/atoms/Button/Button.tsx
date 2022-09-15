import { ReactSVG } from "react-svg";

import { language } from "@/language";
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
        <span>{props.label}</span>
        {props.icon &&
          <StyledIcon disabled={props.disabled}>
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
    >
      {props.loading ? language.loading : getLabel()}
    </StyledButton>
  );
}
