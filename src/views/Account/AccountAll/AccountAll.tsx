import React from "react";

import { ArtifactTable } from "@/global/ArtifactTable";

import { Loader } from "@/components/atoms/Loader";
import { IconButton } from "@/components/atoms/IconButton";

import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language"
import * as S from "./styles";

import { useARProvder } from "@/providers/ARProvider";
import { formatDate, getTagValue } from "@/util";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    function getBookmarkToggle(artifactId: string, selected: boolean) {
        function getIcon() {
            if (localStorage.getItem(artifactId)) {
                return (
                    <Loader alt />
                )
            }
            else {
                return (
                    <IconButton
                        src={selected ? ASSETS.bookmarkSelected : ASSETS.bookmark}
                        handlePress={() => { arProvider.toggleUserBookmark!(artifactId) }}
                    />
                )
            }
        }
        return (
            <S.BookmarkToggle>
                {getIcon()}
            </S.BookmarkToggle>
        )
    }

    React.useEffect(() => {
        if (arProvider.walletAddress) {
            (async function () {
                const bookmarksIds = await arProvider.getBookmarksIds();

                setData((await arProvider.getUserArtifacts(arProvider.walletAddress!)).map((element: any) => {
                    if (!getTagValue(element.node.tags, "Uploader-Tx-Id")) {
                        return {
                            title: getTagValue(element.node.tags, "Artefact-Name"),
                            dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "epoch"),
                            bookmark: getBookmarkToggle(element.node.id, bookmarksIds.includes(element.node.id))
                        }
                    }
                    else {
                        return null;
                    }
                }).filter((element: any) => element !== null));
            })();
        }
    }, [arProvider.walletAddress])

    function getData() {
        if (data && data.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable data={data} showBookmarks={true} />
                </S.Wrapper>
            )
        }
        else {
            return <p>{LANGUAGE.noArtifacts}</p>
        }
    }

    return data ? (
        <>
            {getData()}
        </>

    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}