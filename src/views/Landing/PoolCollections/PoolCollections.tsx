// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { language } from "@/language";
import * as S from "./styles";

function PoolCard(props) {
    return (
        <S.PCWrapper>
            <S.C1>
                <S.C1Content>
                    <S.Title>{props.state.title}</S.Title>
                    <S.Description>{props.state.description}</S.Description>
                </S.C1Content>
                <S.Link href="#">
                    <S.LinkContainer>
                        <span>{language.viewCollection}</span>
                    </S.LinkContainer>
                </S.Link>
            </S.C1>
            <S.C2 style={{ backgroundImage: `url('/assets/img/MOCK_IMAGE.jpeg')` }} />
        </S.PCWrapper>
    )
}

export default function PoolCollections({ data }) {
    function getPools() {
        return data.map((pool) => (
            <PoolCard {...pool} key={pool.id} />
        ))
    }

    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>
                    <S.Header1>Active Collections</S.Header1>
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
                        {getPools()}
                    </Carousel> */}
                    {getPools()[0]}
                </S.Body>
            </S.Content>
        </S.Wrapper>
    )
}