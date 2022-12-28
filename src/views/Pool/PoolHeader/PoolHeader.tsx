import parse from "html-react-parser";

import { ArweaveClient } from "arweave-client";

import { SocialShare } from "global/SocialShare";
import { PoolContribute } from "../PoolContribute";
import { Loader } from "components/atoms/Loader";

import { formatAddress, formatCount } from "config/utils";
import { LANGUAGE } from "config/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function PoolsHeader(props: IProps) {
    const arClient = new ArweaveClient();

    function getSubheader() {
        return (
            <S.SubheaderFlex>
                <S.SubheaderContainer>
                    <S.Subheader1><p>{LANGUAGE.pool.subheader1}</p></S.Subheader1>
                    &nbsp;
                    <S.ID><p>{formatAddress(props.id, false)}</p></S.ID>
                </S.SubheaderContainer>
                &nbsp;
                <S.SubheaderContainer>
                    <S.Subheader1><p>{LANGUAGE.pool.createdOn}</p></S.Subheader1>
                    &nbsp;
                    <S.Subheader2><p>{props.dateCreated}</p></S.Subheader2>
                </S.SubheaderContainer>
            </S.SubheaderFlex>
        )
    }

    function getCount() {
        if (props.count || props.count === 0) {
            return (
                <p>{formatCount(props.count!.toString())}</p>
            )
        }
        else {
            return <Loader sm />
        }
    }

    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{props.title}</S.Header1>
                    <SocialShare
                        type={"primary"}
                        href={window.location.href}
                        title={LANGUAGE.sharePools}
                    />
                </S.HeaderFlex>
                {getSubheader()}
            </S.Header>
            <S.Image image={props.image} />
            <S.FlexTiles>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.pool.totalContributed}</p></S.TileTitle>
                    <S.TileData>
                        <p>{arClient.getARAmount(props.totalContributions)}</p>
                        <S.TContainer><p>{LANGUAGE.arTokens}</p></S.TContainer>
                    </S.TileData>
                </S.Tile>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.pool.artifactsCreated}</p></S.TileTitle>
                    <S.TileData>
                        {getCount()}
                    </S.TileData>
                </S.Tile>
                <S.ContributeTile>
                    <PoolContribute
                        poolId={props.id}
                        header={props.title}
                        subheader={getSubheader()}
                        totalContributions={props.totalContributions}
                        contributors={props.contributors}
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