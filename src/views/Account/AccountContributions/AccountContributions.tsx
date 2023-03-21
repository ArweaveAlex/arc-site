import React from 'react';

import { ArweaveClient } from 'clients/arweave';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { ContributionsList } from './ContributionsList';
import * as S from './styles';

export default function AccountContributions() {
	const arProvider = useArweaveProvider();
	const arClient = new ArweaveClient();

	const [data, setData] = React.useState<any>(null);

	React.useEffect(() => {
		if (arProvider.walletAddress) {
			(async function () {
				setData(
					(await arClient.getUserContributions(arProvider.walletAddress!)).map((element: any) => {
						return element;
					})
				);
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arProvider.walletAddress]);

	function getData() {
		return (
			<S.Wrapper>
				<ContributionsList data={data} />
			</S.Wrapper>
		);
	}

	return getData();
}
