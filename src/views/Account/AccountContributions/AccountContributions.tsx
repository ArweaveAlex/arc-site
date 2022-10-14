import { LANGUAGE } from "@/language";
import { useARProvder } from "@/providers/ARProvider";
import { formatDate, getTagValue } from "@/util";
import React from "react";
import { ContributionsList } from "./ContributionsList";

import * as S from "./styles";

export default function AccountContributions() {
    const [data, setData] = React.useState<any>(null);
    const arProvider = useARProvder();

    React.useEffect(() => {
        if(arProvider.walletAddress){
            (async function () {
                setData((await arProvider.getUserContributions(arProvider.walletAddress!)).map((element: any) => {
                    return element;
                }));
            })();
        }
    }, [arProvider.walletAddress])
    
    return data ? (
        <S.Wrapper>
            <ContributionsList data={data}/>
        </S.Wrapper>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}