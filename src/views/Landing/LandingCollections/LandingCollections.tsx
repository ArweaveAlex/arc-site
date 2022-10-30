import React from "react";
import parse from "html-react-parser";

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { getTxEndpoint } from "@/endpoints";
import * as urls from "@/urls";
import { LANGUAGE } from "@/language";
import { CollectionType } from "@/types";
import * as S from "./styles";
import Router from "next/router";

function CollectionCard(props: CollectionType) {

    const [collectionUrl, setCollectionUrl] = React.useState<string | null>(null);

    function handleViewAccount() {
        Router.push(collectionUrl!);
    }

    React.useEffect(() => {
        setCollectionUrl(`${urls.collection}${props.id}`);
    }, [])

    return collectionUrl ? (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{parse(props.state.briefDescription)}</S.Description>
                </S.C1Content>
                <S.LinkContainer>
                    <S.Link onClick={handleViewAccount}>
                        <span>{LANGUAGE.viewCollection}</span>
                    </S.Link>
                </S.LinkContainer>
            </S.C1>
            <S.C2 image={getTxEndpoint(props.state.image)} />
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
            <S.Content>
                <S.Header>
                    <S.Header1>{LANGUAGE.activeCollections}</S.Header1>
                </S.Header>
                <S.Body>
                    <Carousel
                        autoPlay={false}
                        interval={0}
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={false}
                        stopOnHover={false}
                        useKeyboardArrows={false}
                        swipeScrollTolerance={100}
                        swipeable={true}
                        emulateTouch={true}
                        renderIndicator={(onClickHandler, isSelected, index) => {
                            return (
                                <S.Indicator
                                    onClick={onClickHandler}
                                    onKeyDown={onClickHandler}
                                    selected={isSelected}
                                    value={index}
                                    key={index}
                                />
                            )
                        }}
                    >
                        {getCollections()}
                    </Carousel>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}