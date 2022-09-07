import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { PoolCard } from "@/components/molecules/PoolCard"

import * as S from "./styles";

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