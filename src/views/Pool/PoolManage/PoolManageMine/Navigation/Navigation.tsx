import React from 'react';

import { MINING_SOURCES } from 'helpers/config';
import { language } from 'helpers/language';
import { NavigationComponentType } from 'helpers/types';
import * as windowUtils from 'helpers/window';

import * as S from './styles';
import { IProps } from './types';

export default function Navigation(props: IProps) {
	const [open, setOpen] = React.useState(windowUtils.checkDesktop());
	const [desktop, setDesktop] = React.useState(windowUtils.checkDesktop());

	function renderNavItems() {
		return (
			<div>
				{MINING_SOURCES.map((source: NavigationComponentType, index: number) => {
					return (
						<S.NListItem
							key={index}
							disabled={false}
							active={source.label === props.currentSource.label}
							onClick={() => props.setCurrentSource(source.label)}
						>
							{source.label}
						</S.NListItem>
					);
				})}
			</div>
		);
	}

	function handleWindowResize() {
		if (windowUtils.checkDesktop()) {
			setDesktop(true);
			setOpen(true);
		} else {
			setDesktop(false);
			setOpen(false);
		}
	}

	windowUtils.checkWindowResize(handleWindowResize);

	function getNav() {
		const Title: any = desktop ? S.NTitle : S.NTitleMobile;

		return (
			<S.NWrapper>
				<S.NContent>
					<Title onClick={desktop ? () => {} : () => setOpen(!open)}>
						<p>{language.miningSource}</p>
					</Title>
					<S.NList>{open && renderNavItems()}</S.NList>
				</S.NContent>
			</S.NWrapper>
		);
	}

	return getNav();
}
