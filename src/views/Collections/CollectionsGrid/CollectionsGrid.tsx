import React from "react";
import { Link } from "react-router-dom";

import { CollectionType } from "types";

import { getTxEndpoint } from "endpoints";
import * as urls from "urls";
import { formatDate } from "utils";
import { FALLBACK_IMAGE } from "config";
import { LANGUAGE } from "language";
import * as S from "./styles";

function CollectionTile(props: CollectionType) {

    const [collectionUrl, setCollectionUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        setCollectionUrl(`${urls.collection}${props.id}`);
    }, [props.id])

    return collectionUrl ? (
        <S.PCWrapper>
            <Link to={collectionUrl}>
                {/* <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{parse(props.state.briefDescription)}</S.Description>
                </S.C1Content>
                <Link to={collectionUrl}>
                    <S.LinkContainer>
                        <span>{LANGUAGE.viewCollection}</span>
                    </S.LinkContainer>
                </Link>
            </S.C1> */}
                <S.C2 image={getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)} />
                <S.Info>
                    <S.InfoTitle>
                        <p>{props.state.title}</p>
                    </S.InfoTitle>
                    <S.DCContainer>
                        <S.DC1><p>{LANGUAGE.collection.createdOn}</p></S.DC1>
                        &nbsp;
                        <S.DC2><p>{formatDate(props.state.timestamp, "epoch")}</p></S.DC2>
                    </S.DCContainer>
                </S.Info>
            </Link>
        </S.PCWrapper>
    ) : null
}

export default function CollectionsGrid(props: { data: CollectionType[], title: string }) {
    function getCollections() {
        return props.data.map((collection: CollectionType) => {
            return (
                <CollectionTile {...collection} key={collection.id} />
            )
        })
    }

    return (
        <S.Wrapper>
            <S.SubheaderFlex>
                <S.SubheaderContainer>
                    <S.Subheader1><p>{"Showing:"}</p></S.Subheader1>
                    &nbsp;
                    <S.Subheader2><p>{props.title}</p></S.Subheader2>
                </S.SubheaderContainer>
                &nbsp;
            </S.SubheaderFlex>
            <S.Body>
                {getCollections()}
            </S.Body>
        </S.Wrapper>
    )
}