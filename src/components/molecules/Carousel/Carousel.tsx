import { Carousel } from 'react-responsive-carousel';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as S from './styles';
import { IProps } from './types';

export default function _Carousel(props: IProps) {
	function handleClick(onClickHandler: any) {
		if (props.callback && !props.callback.disabled) {
			props.callback.fn();
		}
		onClickHandler();
	}

	return props.data ? (
		<S.Content>
			<S.Header>
				<S.Header1>{props.title}</S.Header1>
			</S.Header>
			<S.Body>
				<Carousel
					autoPlay={false}
					interval={0}
					showArrows={true}
					showStatus={false}
					showThumbs={false}
					infiniteLoop={false}
					stopOnHover={false}
					useKeyboardArrows={false}
					swipeScrollTolerance={100}
					swipeable={true}
					emulateTouch={true}
					preventMovementUntilSwipeScrollTolerance={true}
					renderArrowPrev={(onClickHandler, hasPrevious) => {
						return (
							<S.PrevAction>
								<IconButton
									src={ASSETS.arrowPrevious}
									type={'alt1'}
									handlePress={onClickHandler}
									dimensions={{ wrapper: 25, icon: 11 }}
									disabled={!hasPrevious}
								/>
							</S.PrevAction>
						);
					}}
					renderArrowNext={(onClickHandler, hasNext) => {
						return (
							<S.NextAction>
								<IconButton
									src={ASSETS.arrowNext}
									type={'alt1'}
									handlePress={() => handleClick(onClickHandler)}
									dimensions={{ wrapper: 25, icon: 11 }}
									disabled={!hasNext}
								/>
							</S.NextAction>
						);
					}}
				>
					{props.data}
				</Carousel>
			</S.Body>
		</S.Content>
	) : null;
}
