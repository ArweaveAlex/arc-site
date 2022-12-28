import React from "react";
import { Link } from "react-router-dom";

import { ArweaveClient } from "arweave-client";

import { formatAddress } from "config/utils";
import * as urls from "config/urls";
import { LANGUAGE } from "config/language";
import { IProps } from "./types";
import * as S from "./styles";

// function Count(props: { id: string }) {
//     const arProvider = useArweaveProvider();

//     const [count, setCount] = React.useState<string | null>(null);

//     React.useEffect(() => {
//         (async function () {
//             setCount((await arProvider.getUserArtifacts(props.id, null)).count)
//         })();
//     }, [props.id, arProvider])

//     function getCount() {
//         if (count) {
//             return (
//                 <>
//                     <p>{count}</p>
//                     &nbsp;
//                     <span>{`${LANGUAGE.artifactsMinted}`}</span>
//                 </>
//             )
//         }
//         else {
//             return (
//                 <p>{LANGUAGE.fetchingCount}&nbsp;...</p>
//             )
//         }
//     }

//     return (
//         <S.Count>
//             {getCount()}
//         </S.Count>

//     )
// }

export default function PoolContributors(props: IProps) {
    const arClient = new ArweaveClient();

    function getTopContributors() {
        const contributorList: React.ReactNode[] = [];
        const contributors: any = props.data.state.contributors;

        const sortedKeys: any = Object.keys(contributors).sort(function (a, b) { return contributors[a] - contributors[b] }).reverse();

        for (let i = 0; i < sortedKeys.length; i++) {
            contributorList.push(
                <S.Row key={i} showBorder={i !== 2}>
                    <S.Number>
                        <p>{i + 1}.</p>
                    </S.Number>
                    <S.Owner>
                        <Link to={`${urls.libraryAll(sortedKeys[i])}`}>{formatAddress(sortedKeys[i], false)}</Link>
                    </S.Owner>
                    <S.Amount>
                        <p>{arClient.getARAmount(
                            arClient.calcContributions(props.data.state.contributors[sortedKeys[i]])
                        )}</p>
                        &nbsp;
                        <span>{`${LANGUAGE.arTokens} ${LANGUAGE.total}`}</span>
                    </S.Amount>
                    {/* <Count id={sortedKeys[i]} /> */}
                </S.Row>
            )
            if (i === 2) {
                return contributorList;
            }
        }
        return contributorList;
    }

    function getRecentContributors() {
        const contributorList: React.ReactNode[] = [];
        const contributorKeys = Object.keys(props.data.state.contributors);
        for (let i = 0; i < contributorKeys.length; i++) {
            contributorList.push(
                <S.Row key={i} showBorder={i !== 2}>
                    <S.RecentOwner>
                        <Link to={`${urls.libraryAll(contributorKeys[i])}`}>{formatAddress(contributorKeys[i], false)}</Link>
                    </S.RecentOwner>
                    <S.Amount>
                        <p>{arClient.getARAmount(
                            arClient.calcContributions(props.data.state.contributors[contributorKeys[i]])
                        )}</p>
                        &nbsp;
                        <span>{`${LANGUAGE.arTokens}`}</span>
                    </S.Amount>
                </S.Row>
            )
            if (i === 2) {
                return contributorList;
            }
        }
        return contributorList;
    }

    return (
        <S.Wrapper>
            <S.CWrapper>
                <S.Header>
                    <h2>{LANGUAGE.contributors.top}</h2>
                </S.Header>
                <S.Body>
                    {getTopContributors()}
                </S.Body>
            </S.CWrapper>
            <S.CWrapper>
                <S.Header>
                    <h2>{LANGUAGE.contributors.recent}</h2>
                </S.Header>
                <S.Body>
                    {getRecentContributors()}
                </S.Body>
            </S.CWrapper>
        </S.Wrapper>
    )
}