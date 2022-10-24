import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { IconButton } from "@/components/atoms/IconButton";

import { ArtifactTable } from "@/global/ArtifactTable";

import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import { formatDate, getTagValue } from "@/util";
import * as S from "./styles";

export default function AccountBookmarks() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    function getBookmarkToggle(txId: string, selected: boolean) {
        return (
            <S.BookmarkToggle>
                <IconButton
                    src={selected ? ASSETS.bookmarkSelected : ASSETS.bookmark}
                    handlePress={() => { arProvider.toggleUserBookmark!(txId) }}
                />
            </S.BookmarkToggle>
        )
    }

    React.useEffect(() => {
        (async function () {
            const bookmarksIds = await arProvider.getBookmarksIds();
            
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress)).map((element: any) => {
                    if (!getTagValue(element.node.tags, "Uploader-Tx-Id") && bookmarksIds.includes(element.node.id)) {
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
            }
        })();
    }, [arProvider.walletAddress])

    return data ? (
        <S.Wrapper>
            <ArtifactTable data={data} showBookmarks={true} />
        </S.Wrapper>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}