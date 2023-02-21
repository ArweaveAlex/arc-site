import { ASSETS } from "helpers/config";

import { IProps } from "./types";
import * as S from "./styles";

export default function Checkbox(props: IProps) {
  return (
    <S.Input
      image={ASSETS.checkmark}
      checked={props.checked}
      disabled={props.disabled}
      type={"checkbox"}
      onChange={props.handleSelect}
    />
  );
}
