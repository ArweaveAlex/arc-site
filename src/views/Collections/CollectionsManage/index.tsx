import React from 'react';

import { useQuery } from 'hooks/useQuery';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';
import { Query } from 'wrappers/Query';

import { CollectionsManageArtifacts } from './CollectionsManageArtifacts';
import { CollectionsManageForm } from './CollectionsManageForm';
import { CollectionsManageHeader } from './CollectionsManageHeader';
import * as S from './styles';

export default function CollectionsManage() {
	const query = useQuery();
	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	// TODO: selectedIds []
	const [selectedIds, setSelectedIds] = React.useState<string[]>([
		'lFO2qdhjBpMG13-Zamz3vW7E7FFbJT9NgPhgdgDUVQc',
		'6R2dVcktecT0dbezgHq8eHrmzRpnl8JrtaDXT-ZZ69s',
		'9hUxb7MCMmMJ61oWJAKbGMczUDVYvPjmLs_xSLsppF4',
		'FRRpmc0_e4--5c_Lsg9yNpqsu9aIQLg920GUKo6JjPo',
		'PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU',
		'qERJuxaUy2Vs9VwjCZSu5Lt0Tk1ssox2o0hRlHb7WkY',
	]);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	function getData() {
		return (
			<S.Wrapper>
				<S.HeaderWrapper>
					<CollectionsManageHeader selectedIds={selectedIds} />
				</S.HeaderWrapper>
				<S.ContentWrapper>
					<S.ArtifactsWrapper>
						<CollectionsManageArtifacts
							owner={query.get('owner')}
							selectedIds={selectedIds}
							setSelectedIds={(ids: string[]) => setSelectedIds(ids)}
						/>
					</S.ArtifactsWrapper>
					<S.FormWrapper>
						<CollectionsManageForm />
					</S.FormWrapper>
				</S.ContentWrapper>
			</S.Wrapper>
		);
	}

	return arProvider.walletAddress ? (
		<Query value={'owner'} check={[arProvider.walletAddress]}>
			{getData()}
		</Query>
	) : (
		showWalletBlock && <WalletBlock />
	);
}
