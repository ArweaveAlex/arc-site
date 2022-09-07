import { IProps } from "./types";
import * as S from "./styles";
import { language } from "@/language";


export default function Button(props: IProps) {
  const buttonStyle = getType();
  const StyledButton = buttonStyle.wrapper;

  function getType() {
    let buttonObj: {
      wrapper: any;
    };
    buttonObj = {
      wrapper: S.Primary,
    };
    return buttonObj;
  }

  return (
    <StyledButton
      tabIndex={props.noFocus ? -1 : 0}
      type={props.formSubmit ? "submit" : "button"}
      onClick={props.handlePress}
      onKeyPress={props.handlePress}
      disabled={props.disabled}
    >
      {props.loading ? language.loading : props.label}
    </StyledButton>
  );
}
