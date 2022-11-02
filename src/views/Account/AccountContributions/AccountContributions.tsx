import { LANGUAGE } from "language";
import { useARProvder } from "providers/ARProvider";
import React from "react";
import { ContributionsList } from "./ContributionsList";

import * as S from "./styles";

export default function AccountContributions() {
    const [data, setData] = React.useState<any>(null);
    const arProvider = useARProvder();

    React.useEffect(() => {
        if (arProvider.walletAddress) {
            (async function () {
                setData((await arProvider.getUserContributions(arProvider.walletAddress!)).map((element: any) => {
                    return element;
                }));
            })();
        }
    }, [arProvider, arProvider.walletAddress])

    function getData() {
        if (data && data.length > 0) {
            return (
                <S.Wrapper>
                    <ContributionsList data={data} />
                </S.Wrapper>
            )
        }
        else {
            return <p>{LANGUAGE.noContributions}</p>
        }
    }

    return data ? (
        <>{getData()}</>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}