import { IProps } from './types';
import * as S from './styles';

export default function TextArea(props: IProps) {
	return (
		<S.Wrapper>
			{props.label && <label>{props.label}</label>}
			<S.TextArea
				value={props.value}
				onChange={props.onChange}
				disabled={props.disabled}
				invalid={props.invalid.status}
				placeholder={props.placeholder ? props.placeholder : ''}
				data-testid={props.testingCtx}
			/>
			<S.ErrorContainer>{props.invalid.message && <S.Error>{props.invalid.message}</S.Error>}</S.ErrorContainer>
		</S.Wrapper>
	);
}
