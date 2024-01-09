import { Button } from '../Button';

import * as S from './styles';
import { IProps } from './types';

export default function MultiSelect(props: IProps) {
	function handleChange(option: string) {
		const updatedOptions = props.values.includes(option)
			? props.values.filter((item) => item !== option)
			: [...props.values, option];

		props.onChange(updatedOptions);
	}

	return (
		<S.Wrapper>
			{props.label && <S.Label>{props.label}</S.Label>}
			<S.Options>
				{props.options.map((option: string, index: number) => {
					return (
						<Button
							key={index}
							type={'alt2'}
							label={option}
							handlePress={() => handleChange(option)}
							active={props.values.includes(option)}
							disabled={props.disabled}
							noMinWidth
						/>
					);
				})}
			</S.Options>
			<S.ErrorContainer>{props.invalid.message && <S.Error>{props.invalid.message}</S.Error>}</S.ErrorContainer>
		</S.Wrapper>
	);
}
