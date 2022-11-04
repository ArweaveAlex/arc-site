import parse from "html-react-parser";

import { PageShare } from "global/PageShare";
import { CollectionContribute } from "../CollectionContribute";

import { formatAddress } from "utils";
import { LANGUAGE } from "language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionHeader(props: IProps) {

    function getSubheader() {
        return (
            <S.SubheaderFlex>
                <S.SubheaderContainer>
                    <S.Subheader1><p>{LANGUAGE.collection.subheader1}</p></S.Subheader1>
                    &nbsp;
                    <S.ID><p>{formatAddress(props.id, false)}</p></S.ID>
                </S.SubheaderContainer>
                &nbsp;
                <S.SubheaderContainer>
                    <S.Subheader1><p>{LANGUAGE.collection.createdOn}</p></S.Subheader1>
                    &nbsp;
                    <S.Subheader2><p>{props.dateCreated}</p></S.Subheader2>
                </S.SubheaderContainer>
            </S.SubheaderFlex>
        )
    }

    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{props.title}</S.Header1>
                    <PageShare 
                        href={window.location.href}
                        title={"Check out this collection on Alex. !"}
                    />
                </S.HeaderFlex>
                {getSubheader()}
            </S.Header>
            <S.Image image={props.image} />
            <S.FlexTiles>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.collection.totalContributed}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.totalContributions}</p>
                        <S.TContainer><p>{LANGUAGE.arTokens}</p></S.TContainer>
                    </S.TileData>
                </S.Tile>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.collection.artifactsCreated}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.count}</p>
                    </S.TileData>
                </S.Tile>
                <S.ContributeTile>
                    <CollectionContribute
                        poolId={props.id}
                        header={props.title}
                        subheader={getSubheader()}
                    />
                </S.ContributeTile>
            </S.FlexTiles>
            <S.LongDescription>
                <S.LDHeader><h2>{LANGUAGE.about}</h2></S.LDHeader>
                <S.LDBody>{parse(props.description)}</S.LDBody>
            </S.LongDescription>
        </S.Wrapper>
    )
}