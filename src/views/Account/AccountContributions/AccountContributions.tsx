import React from "react";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { ArweaveClient } from "clients/arweave";

import { ContributionsList } from "./ContributionsList";
import { Loader } from "components/atoms/Loader";

import { LANGUAGE } from "helpers/language";
import * as S from "./styles";

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
		if (data && data.length > 0) {
			return (
				<S.Wrapper>
					<ContributionsList data={data} />
				</S.Wrapper>
			);
		} else {
			return (
				<S.NoContributionsContainer>
					<p>{LANGUAGE.noContributions}</p>
				</S.NoContributionsContainer>
			);
		}
	}

	return data ? (
		<>{getData()}</>
	) : (
		<S.LoadingContainer>
			<Loader sm />
		</S.LoadingContainer>
	);
}
