import parse from "html-react-parser";

import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

export default function LandingInfo() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.Header1>{LANGUAGE.info.header1}</S.Header1>
                    <S.HeaderFlex>
                        <S.Header2>{LANGUAGE.info.header2}</S.Header2>
                    </S.HeaderFlex>
                </S.Header>
                <S.Body>
                    <S.InfoContainer>
                        <S.Title>{parse(LANGUAGE.info.subheader)}</S.Title>
                        <S.Description>{parse(LANGUAGE.info.content)}</S.Description>
                    </S.InfoContainer>
                    <S.AssetContainer>
                        <S.Asset image={ASSETS.infoGraphic} />
                        <S.AssetSource>{LANGUAGE.info.assetSrc}</S.AssetSource>
                    </S.AssetContainer>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}