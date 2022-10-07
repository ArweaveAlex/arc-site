import { IProps } from "./types";
import * as S from "./styles";

export default function FormField(props: IProps) {

  function getValue() {
    if (props.type === "number") {
      return isNaN(Number(props.value)) ? "" : props.value;
    }
    else {
      return props.value;
    }
  }

  return (
    <S.Wrapper>
      {props.label && <label>{props.label}</label>}
      <S.Input
        type={props.type ? props.type : "text"}
        value={getValue()}
        onChange={props.onChange}
        disabled={props.disabled}
        invalid={props.invalid.status}
        placeholder={props.placeholder ? props.placeholder : ""}
      />
      <S.EndTextContainer>
        {
          props.endText && <S.EndText>{props.endText}</S.EndText>
        }
      </S.EndTextContainer>
      <S.ErrorContainer>
        {
          props.invalid.message && <S.Error>{props.invalid.message}</S.Error>
        }
      </S.ErrorContainer>
    </S.Wrapper>
  );
}
