import React from "react";
import slugify from "slugify";
import parse from "html-react-parser";

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { getTxEndpoint } from "@/endpoints";
import * as urls from "@/urls";
import { LANGUAGE } from "@/language";
import { ArweaveCollectionProps } from "@/types";
import * as S from "./styles";

function CollectionCard(props: ArweaveCollectionProps) {

    const [collectionUrl, setCollectionUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        setCollectionUrl(`${urls.collection}${slugify(props.state.title.toLowerCase() + "-" + props.id)}`)
    })

    return collectionUrl ? (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{parse(props.state.briefDescription)}</S.Description>
                </S.C1Content>
                <S.LinkContainer>
                    <S.Link href={collectionUrl}>
                        <span>{LANGUAGE.viewCollection}</span>
                    </S.Link>
                </S.LinkContainer>
            </S.C1>
            <S.C2 image={getTxEndpoint(props.state.image)} />
        </S.PCWrapper>
    ) : null
}

export default function LandingCollections(props: { data: ArweaveCollectionProps[] }) {
    function getCollections() {
        return props.data.map((collection: ArweaveCollectionProps) => {
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