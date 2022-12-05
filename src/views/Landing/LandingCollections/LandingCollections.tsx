import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Carousel } from "components/molecules/Carousel";

import { getTxEndpoint } from "endpoints";
import * as urls from "urls";
import { LANGUAGE } from "language";
import { CollectionType } from "types";
import * as S from "./styles";
import { FALLBACK_IMAGE } from "config";

function CollectionCard(props: CollectionType) {

    const [collectionUrl, setCollectionUrl] = React.useState<string | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        setCollectionUrl(`${urls.collection}${props.id}`);
    }, [props.id])

    React.useEffect(() => {
        (async function () {
            const imageResponse = (await fetch(getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)));
            setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
        })()
    })

    return collectionUrl && imageUrl ? (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{parse(props.state.briefDescription)}</S.Description>
                </S.C1Content>
                <Link to={collectionUrl}>
                    <S.LinkContainer>
                        <span>{LANGUAGE.viewCollection}</span>
                    </S.LinkContainer>
                </Link>
            </S.C1>
            <S.C2 image={getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)} />
        </S.PCWrapper>
    ) : null
}

export default function LandingCollections(props: { data: CollectionType[] }) {
    function getCollections() {
        return props.data.map((collection: CollectionType) => {
            return (
                <CollectionCard {...collection} key={collection.id} />
            )
        })
    }

    return (
        <S.Wrapper>
            <Carousel title={LANGUAGE.activeCollections} data={getCollections()} />
        </S.Wrapper>
    )
}