import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';

import { LANGUAGE } from 'helpers/language';
import { ASSETS } from 'helpers/config';
import { IProps } from './types';
import * as S from './styles';

export default function Search(props: IProps) {
	return (
		<S.Wrapper>
			<S.SearchWrapper>
				<S.SearchIcon disabled={props.disabled}>
					<ReactSVG src={ASSETS.search} />
				</S.SearchIcon>
				<S.SearchInput
					type={'text'}
					placeholder={props.loading ? `${LANGUAGE.searchInitializing} ...` : null}
					value={props.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChange(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => props.handleSearch(e)}
					disabled={props.disabled}
				/>
				<S.ClearWrapper>
					<IconButton src={ASSETS.close} type={'primary'} handlePress={() => props.handleClear()} disabled={props.disabled || !props.value} warning sm />
				</S.ClearWrapper>
			</S.SearchWrapper>
			<S.SearchButtonWrapper>
				<Button type={'alt1'} label={'Search'} handlePress={(e: React.MouseEvent<HTMLInputElement>) => props.handleSearch(e)} disabled={props.disabled || !props.value} noMinWidth />
			</S.SearchButtonWrapper>
		</S.Wrapper>
	);
}
