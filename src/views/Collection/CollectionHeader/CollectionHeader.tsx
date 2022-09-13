import { Button } from "@/components/atoms/Button";

import * as util from "@/util";
import { language } from "@/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionHeader(props: IProps) {
    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{props.title}</S.Header1>
                    <Button
                        label={language.shareCollection}
                        type={"secondary"}
                        handlePress={() => console.log('Share collection')}
                        icon={"/assets/img/share.svg"}
                    />
                </S.HeaderFlex>
                <S.SubheaderFlex>
                    <S.Subheader1><p>{language.collection.subheader1}</p></S.Subheader1>
                    &nbsp;
                    <S.ID><p>{util.formatAddress(props.id)}</p></S.ID>
                </S.SubheaderFlex>
            </S.Header>
            <S.Image image={props.image} />
            <S.FlexTiles>
                <S.Tile>
                    <S.TileTitle><p>{language.collection.totalContributed}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.totalContributions}</p>
                        <S.TContainer><p>$AR</p></S.TContainer>
                    </S.TileData>
                </S.Tile>
                <S.Tile>
                    <S.TileTitle><p>{language.collection.artifactsCreated}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.artefactCount}</p>
                    </S.TileData>
                </S.Tile>
                <S.ContributeTile></S.ContributeTile>
            </S.FlexTiles>
        </S.Wrapper>
    )
}