import slugify from "slugify";

// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as urls from "@/urls";
import { language } from "@/language";
import { ArweaveCollectionProps } from "@/types";
import * as S from "./styles";

function CollectionCard(props: ArweaveCollectionProps) {
    return (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{props.state.shortDescription}</S.Description>
                </S.C1Content>
                <S.Link href={`${urls.collection}${slugify(
                    props.state.title.toLowerCase() + "-" + props.id
                )}`}>
                    <S.LinkContainer>
                        <span>{language.viewCollection}</span>
                    </S.LinkContainer>
                </S.Link>
            </S.C1>
            <S.C2 image={props.state.image} />
        </S.PCWrapper>
    )
}

export default function Collections(props: { data: ArweaveCollectionProps[] }) {
    function getCollections() {
        return props.data.map((collection: ArweaveCollectionProps) => (
            <CollectionCard {...collection} key={collection.id} />
        ))
    }

    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.Header1>{language.activeCollections}</S.Header1>
                </S.Header>
                <S.Body>
                    {/* <Carousel
                        autoPlay
                        interval={5500}
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop
                        stopOnHover={false}
                        useKeyboardArrows={true}
                        swipeScrollTolerance={100}
                        preventMovementUntilSwipeScrollTolerance={true}
                        emulateTouch={true}
                    >
                        {getCollections()}
                    </Carousel> */}
                    {getCollections()[0]}
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}