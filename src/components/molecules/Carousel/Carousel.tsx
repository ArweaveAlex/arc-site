import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { StepType } from 'helpers/types';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as S from './styles';
import { IProps } from './types';

export default function _Carousel(props: IProps) {
	const carouselRef = React.useRef<any>(null);

	const [currentSlide, setCurrentSlide] = React.useState(0);

	function handleClick(step: StepType) {
		if (props.callback && !props.callback.disabled) {
			props.callback.fn(step);
		}
		if (carouselRef.current) {
			step === 'prev' ? carouselRef.current.onClickPrev() : carouselRef.current.onClickNext();
		}
	}

	function handleSlideChange(newIndex: number) {
		setCurrentSlide(newIndex);
	}

	function getAction(step: StepType, disabled: boolean) {
		const Action = step === 'prev' ? S.PrevAction : S.NextAction;
		if (props.data && props.data.length > 1) {
			return (
				<Action>
					<IconButton
						src={step === 'prev' ? ASSETS.arrowPrevious : ASSETS.arrowNext}
						type={'alt1'}
						handlePress={() => handleClick(step === 'prev' ? 'prev' : 'next')}
						dimensions={{ wrapper: 25, icon: 11 }}
						disabled={disabled}
					/>
				</Action>
			);
		} else {
			return null;
		}
	}

	return props.data ? (
		<S.Content>
			<S.Header>
				<S.Header1>{props.title}</S.Header1>
				<S.Actions>
					{getAction('prev', currentSlide === 0)}
					{getAction('next', currentSlide === props.data.length - 1)}
				</S.Actions>
			</S.Header>
			<S.Body>
				<Carousel
					ref={carouselRef}
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
					selectedItem={currentSlide}
					onChange={handleSlideChange}
				>
					{props.data}
				</Carousel>
			</S.Body>
		</S.Content>
	) : null;
}
