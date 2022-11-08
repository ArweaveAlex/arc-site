import React from "react";
import { useParams } from "react-router-dom";

import { useARProvder } from "providers/ARProvider";

import { ArtifactTable } from "global/ArtifactTable";

import { formatAddress } from "utils";
import { ArtifactResponseType } from "types";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function Library() {
    const { id } = useParams();

    const arProvider = useARProvder();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [data, setData] = React.useState<ArtifactResponseType>({
        nextCursor: null,
        previousCursor: null,
        contracts: [],
        count: null
    });

    React.useEffect(() => {
        (async function () {
            if (id) {
                setData((await arProvider.getUserArtifacts(id, cursor)));
            }
        })();
        /*  ESLint used to avoid warning with data.nextCursor not being used in dependency array
            By adding data.nextCursor to dependency array this effect will continue to run
            getUserArtifacts and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, cursor])

    function checkState() {
        return data && (data.count !== null);
    }

    function getData() {
        if (checkState()) {
            if (data.contracts.length > 0) {
                return (
                    <S.TableWrapper>
                        <ArtifactTable
                            data={data}
                            showBookmarks={false}
                            handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                            cursors={{
                                next: data.nextCursor,
                                previous: data.previousCursor
                            }}
                            owner={arProvider.walletAddress}
                        />
                    </S.TableWrapper>
                )
            }
            else {
                return <p>{LANGUAGE.noArtifacts}</p>
            }
        }
        else {
            return (
                <p>{LANGUAGE.loading}&nbsp;...</p>
            )
        }
    }

    // return checkState() ? (
    //     <>{getData()}</>
    // ) : <p>{LANGUAGE.loading}&nbsp;...</p>

    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <S.HeaderContent>
                    <S.HeaderContainer>
                        <S.FlexHeader>
                            <S.Header1>{`${formatAddress(id!, false)}'s ${LANGUAGE.library.header1}`}</S.Header1>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <S.Header2Container>
                                {/* <S.Header2>{id ? formatAddress(id, true) : "N/A"}</S.Header2> */}
                            </S.Header2Container>
                        </S.FlexHeader>
                    </S.HeaderContainer>
                </S.HeaderContent>
            </S.HeaderWrapper>
            <S.BodyWrapper>
                {getData()}
            </S.BodyWrapper>
        </S.Wrapper>
    )
}