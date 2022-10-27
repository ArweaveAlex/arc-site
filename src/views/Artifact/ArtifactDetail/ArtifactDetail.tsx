import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactDetail(props: IProps) {
    return (
        <S.Wrapper>
            <S.RawData>
                <div>
                    <p>{props.data.rawData}</p>
                </div>
            </S.RawData>
        </S.Wrapper>
    )
}