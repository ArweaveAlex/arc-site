import parse from "html-react-parser";

import { ArweaveClient } from "clients/arweave";

import { SocialShare } from "global/SocialShare";
import { PoolContribute } from "../PoolContribute";
import { Loader } from "components/atoms/Loader";

import { formatAddress, formatCount } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
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
                    <S.ID><p>{props.id ? formatAddress(props.id, false) : null}</p></S.ID>
                </S.SubheaderContainer>
                &nbsp;
                <S.SubheaderContainer>
                    <S.Subheader1><p>{LANGUAGE.pool.createdOn}</p></S.Subheader1>
                    &nbsp;
                    <S.Subheader2><p>{props.dateCreated ? props.dateCreated : null}</p></S.Subheader2>
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

    function getImage() {
        if (props.image) {
            return (
                <S.Image image={props.image} />
            )
        }
        else {
            return (
                <S.ImageLoading>
                    <Loader sm />
                </S.ImageLoading>
            )
        }
    }

    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{props.title ? props.title : null}</S.Header1>
                    <SocialShare
                        type={"primary"}
                        href={window.location.href}
                        title={LANGUAGE.sharePools}
                    />
                </S.HeaderFlex>
                {getSubheader()}
            </S.Header>
            {getImage()}
            <S.FlexTiles>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.pool.totalContributed}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.totalContributions ? arClient.getARAmount(props.totalContributions) : null}</p>
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
                        poolId={props.id ? props.id : null}
                        header={props.title ? props.title : null}
                        subheader={getSubheader()}
                        totalContributions={props.totalContributions ? props.totalContributions : null}
                        contributors={props.contributors ? props.contributors : null}
                    />
                </S.ContributeTile>
            </S.FlexTiles>
            <S.LongDescription>
                <S.LDHeader><h2>{LANGUAGE.about}</h2></S.LDHeader>
                <S.LDBody>{props.description ? parse(props.description) : null}</S.LDBody>
            </S.LongDescription>
        </S.Wrapper>
    )
}