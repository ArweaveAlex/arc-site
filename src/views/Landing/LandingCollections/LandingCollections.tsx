import slugify from "slugify";
import parse from "html-react-parser";

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
                    <S.Description>{parse(props.state.shortDescription)}</S.Description>
                </S.C1Content>
                <S.LinkContainer>
                    <S.Link href={`${urls.collection}${slugify(
                        props.state.title.toLowerCase() + "-" + props.id
                    )}`}>
                        <span>{language.viewCollection}</span>
                    </S.Link>
                </S.LinkContainer>
            </S.C1>
            <S.C2 image={props.state.image} />
        </S.PCWrapper>
    )
}

export default function LandingCollections(props: { data: ArweaveCollectionProps[] }) {
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
                    {/* {getCollections()[0]} */}
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}