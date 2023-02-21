import React from "react";

import { IProps } from "./types";
import { LANGUAGE } from "helpers/language";
import * as S from "./styles";

export default function Select(props: IProps) {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleChange(e: any) {
    setValue(e.target.value);
    props.onChange(e);
  }

  return props.options ? (
    <S.Wrapper>
      <S.Row>
        <S.Label>{props.display}</S.Label>
      </S.Row>
      <S.Select
        value={value}
        onChange={(e) => handleChange(e)}
        disabled={props.disabled}
      >
        <>
          {!value && (
            <option hidden value="">
              {LANGUAGE.select}
            </option>
          )}
          {props.options.map((option: string, index: number) => {
            return <option key={index}>{option}</option>;
          })}
        </>
      </S.Select>
    </S.Wrapper>
  ) : null;
}
