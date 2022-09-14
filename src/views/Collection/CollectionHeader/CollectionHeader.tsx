import parse from "html-react-parser";

import { Button } from "@/components/atoms/Button";

import { CollectionContribute } from "../CollectionContribute";

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
                        disabled
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
                        <S.TContainer><p>{language.arTokens}</p></S.TContainer>
                    </S.TileData>
                </S.Tile>
                <S.Tile>
                    <S.TileTitle><p>{language.collection.artifactsCreated}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.artefactCount}</p>
                    </S.TileData>
                </S.Tile>
                <S.ContributeTile>
                    <CollectionContribute />
                </S.ContributeTile>
            </S.FlexTiles>
            <S.LongDescription>
                <S.LDHeader><h2>{language.about}</h2></S.LDHeader>
                <S.LDBody>{parse(props.longDescription)}</S.LDBody>
            </S.LongDescription>
        </S.Wrapper>
    )
}