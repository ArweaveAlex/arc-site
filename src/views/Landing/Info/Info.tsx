import parse from "html-react-parser";

import { language } from "@/language";
import * as S from "./styles";

export default function Info() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.Header1>{language.info.header1}</S.Header1>
                    <S.HeaderFlex>
                        <S.Header2>{language.info.header2}</S.Header2>
                    </S.HeaderFlex>
                </S.Header>
                <S.Body>
                    <S.InfoContainer>
                        <S.Title>{parse(language.info.subheader)}</S.Title>
                        <S.Description>{parse(language.info.content)}</S.Description>
                    </S.InfoContainer>
                    <S.AssetContainer>
                        <S.Asset image={"/assets/img/info-graphic.png"} />
                        <S.AssetSource>{language.info.assetSrc}</S.AssetSource>
                    </S.AssetContainer>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}