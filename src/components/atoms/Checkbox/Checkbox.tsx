import { IProps } from "./types";
import * as S from "./styles";

export default function Checkbox(props: IProps) {
	return <S.Input checked={props.checked} disabled={props.disabled} type="checkbox" onChange={props.handleSelect} />;
}
