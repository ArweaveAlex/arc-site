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

<<<<<<< HEAD
=======
	function getAction(step: 'prev' | 'next', clickHandler: any, disabled: boolean) {
		const Action = step === 'prev' ? S.PrevAction : S.NextAction;
		if (props.data && props.data.length > 1) {
			return (
				<Action>
					<IconButton
						src={step === 'prev' ? ASSETS.arrowPrevious : ASSETS.arrowNext}
						type={'alt1'}
						handlePress={() => handleClick(clickHandler)}
						dimensions={{ wrapper: 25, icon: 11 }}
						disabled={disabled}
					/>
				</Action>
			);
		} else {
			return null;
		}
	}

>>>>>>> dev
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
<<<<<<< HEAD
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
=======
						return getAction('prev', onClickHandler, !hasPrevious);
					}}
					renderArrowNext={(onClickHandler, hasNext) => {
						return getAction('next', onClickHandler, !hasNext);
>>>>>>> dev
					}}
				>
					{props.data}
				</Carousel>
			</S.Body>
		</S.Content>
	) : null;
}

{
	/* <S.NextAction>
	<IconButton
		src={ASSETS.arrowNext}
		type={'alt1'}
		handlePress={() => handleClick(onClickHandler)}
		dimensions={{ wrapper: 25, icon: 11 }}
		disabled={!hasNext}
	/>
</S.NextAction> */
}
