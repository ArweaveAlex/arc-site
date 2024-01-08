import React from 'react';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { MINING_SOURCES, POOL_TEST_MODE } from 'helpers/config';
import { NavigationComponentType } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { Navigation } from './Navigation';
import * as S from './styles';

export default function PoolManageMine() {
	const { id } = useParams();

	const arProvider = useArweaveProvider();

	const [poolClient, setPoolClient] = React.useState<any>(null);
	const [currentSource, setCurrentSource] = React.useState<NavigationComponentType>(MINING_SOURCES[0]);
	const [_balances, setBalances] = React.useState<ArcFramework.PoolBalancesType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				let poolConfigClient = new ArcFramework.PoolConfigClient({ testMode: POOL_TEST_MODE });
				const poolConfig = await poolConfigClient.initFromContract({ poolId: id });
				if (poolConfig) {
					poolConfig.walletKey = window.arweaveWallet;
					setPoolClient(new ArcFramework.PoolClient({ poolConfig }));
				}
			}
		})();
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (poolClient) {
				setBalances(await poolClient.balances());
			} else {
				setBalances({
					totalBalance: 0,
					arweaveBalance: 0,
					bundlrBalance: 0,
					usedFunds: 0,
					userBalance: 0,
					poolBalance: 0,
					transferBalance: 0,
				});
			}
		})();
	}, [poolClient]);

	return (
		<S.Wrapper>
			<Navigation
				currentSource={currentSource}
				setCurrentSource={(label: string) =>
					setCurrentSource(MINING_SOURCES.find((source: NavigationComponentType) => source.label === label))
				}
			/>
			<S.CMiner>{currentSource.component(false)}</S.CMiner>
		</S.Wrapper>
	);
}
