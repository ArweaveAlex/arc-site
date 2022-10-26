import { ReactSVG } from "react-svg";

import { ASSETS } from "@/config";
import * as S from "./styles";

export default function ArtifactHeader() {
    return (
        <S.Wrapper>
            <S.ContentWrapper>
                {/* <S.HideWrapper>

                </S.HideWrapper> */}
                <S.Content>
                    <S.Info>
                        <S.InfoLogo>
                            <ReactSVG src={ASSETS.logoAlt1} />
                        </S.InfoLogo>
                        <S.InfoTitle>
                            <p>October 2022 United Kingdom government crisis</p>
                        </S.InfoTitle>
                        <S.InfoType>
                            <ReactSVG src={ASSETS.artifactTypes.webpage} />
                            <p>Webpage</p>
                        </S.InfoType>
                        <S.InfoMintDate>
                            <p>Minted 10/27/2022 09:24:12</p>
                        </S.InfoMintDate>
                        <S.InfoOwner>
                            <p>Archivist 4tvc ... R9cX</p>
                        </S.InfoOwner>
                        <S.InfoCollection>
                            <p>Russia/Ukraine Conflict Collection</p>
                        </S.InfoCollection>
                    </S.Info>
                    <S.Tabs>

                    </S.Tabs>
                </S.Content>
            </S.ContentWrapper>
        </S.Wrapper>
    )
}