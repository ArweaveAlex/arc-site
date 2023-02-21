import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { IProps } from "./types";
import * as S from "./styles";

export default function _Carousel(props: IProps) {
  return props.data ? (
    <S.Content>
      <S.Header>
        <S.Header1>{props.title}</S.Header1>
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
          preventMovementUntilSwipeScrollTolerance={true}
          renderIndicator={(onClickHandler, isSelected, index) => {
            return (
              <S.Indicator
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                selected={isSelected}
                value={index}
                key={index}
              />
            );
          }}
        >
          {props.data}
        </Carousel>
      </S.Body>
    </S.Content>
  ) : null;
}
