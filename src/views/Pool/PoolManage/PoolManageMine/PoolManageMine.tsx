import React from 'react';

import { MINING_SOURCES } from 'helpers/config';
import { NavigationComponentType } from 'helpers/types';

import { Navigation } from './Navigation';
import * as S from './styles';

export default function PoolManageMine() {
	const [currentSource, setCurrentSource] = React.useState<NavigationComponentType>(MINING_SOURCES[0]);

	const CurrentMiner = currentSource.component;

	return (
		<S.Wrapper>
			<Navigation
				currentSource={currentSource}
				setCurrentSource={(label: string) =>
					setCurrentSource(MINING_SOURCES.find((source: NavigationComponentType) => source.label === label))
				}
			/>
			<S.CMiner>
				<CurrentMiner />
			</S.CMiner>
		</S.Wrapper>
	);
}
