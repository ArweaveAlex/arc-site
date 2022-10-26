import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactTweet(props: IProps) {
    return (
        <S.Wrapper>
            <S.Content>
                <p>{props.data.rawData}</p>
            </S.Content>
        </S.Wrapper>
    )
}