import React from 'react';

import { ASSETS } from 'helpers/config';

import { IconButton } from '../IconButton';

import * as S from './styles';
import { IProps } from './types';

export default function MultiSelect(props: IProps) {
	const [showOptions, setShowOptions] = React.useState<boolean>(false);

	function getValue() {
		if (!props.values || props.values.length <= 0) {
			return (
				<S.Display>
					<p>{props.display}</p>
				</S.Display>
			);
		} else {
			return (
				<S.ValuesMap>
					{props.values.map((value: string, index: number) => {
						return (
							<S.Value key={index}>
								<p>{value}</p>
								<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={() => handleChange(value)} />
							</S.Value>
						);
					})}
				</S.ValuesMap>
			);
		}
	}

	function handleChange(option: string) {
		const updatedOptions = props.values.includes(option)
			? props.values.filter((item) => item !== option)
			: [...props.values, option];

		props.onChange(updatedOptions);
	}

	return (
		<S.Wrapper>
			{props.label && <S.Label>{props.label}</S.Label>}
			<S.Input onClick={() => setShowOptions(!showOptions)}>{getValue()}</S.Input>
			{showOptions && (
				<S.Options>
					{props.options.map((option: string, index: number) => {
						return (
							<S.Option key={index} onClick={() => handleChange(option)} active={props.values.includes(option)}>
								{option}
							</S.Option>
						);
					})}
				</S.Options>
			)}
			<S.ErrorContainer>{props.invalid.message && <S.Error>{props.invalid.message}</S.Error>}</S.ErrorContainer>
		</S.Wrapper>
	);
}
