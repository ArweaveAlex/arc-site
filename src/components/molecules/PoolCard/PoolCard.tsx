import { language } from "@/language";
import * as S from "./styles";

export default function PoolCard(props) {
    return (
        <S.Wrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{props.state.description}</S.Description>
                </S.C1Content>
                <S.Link href="#">
                    <S.LinkContainer>
                        <span>{language.viewCollection}</span>
                    </S.LinkContainer>
                </S.Link>
            </S.C1>
            <S.C2 style={{ backgroundImage: `url('/assets/img/MOCK_IMAGE.jpeg')` }} />
        </S.Wrapper>
    )
}