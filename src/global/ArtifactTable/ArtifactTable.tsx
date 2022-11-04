import React from "react";
import { Link } from "react-router-dom";

import { useARProvder } from "providers/ARProvider";

import { Loader } from "components/atoms/Loader";
import { IconButton } from "components/atoms/IconButton";

import { Table } from "components/organisms/Table";

import { LANGUAGE } from "language";
import { ASSETS, PAGINATOR, STORAGE, TAGS } from "config";

import { AlignType, ArtifactTableRowType, TableHeaderType } from "types";
import { 
    formatDate, 
    getTagValue, 
    getJSONStorage 
} from "utils";
import * as urls from "urls";
import { IProps } from "./types";
import * as S from "./styles";

function BookmarkToggle(props: { artifactId: string, bookmarkIds: string[] }) {
    const arProvider = useARProvder();

    const [txPending, setTxPending] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (localStorage.getItem(props.artifactId)) {
            const txJson = getJSONStorage(props.artifactId);
            const txIdValue = Object.values(txJson)[0];
            if (txIdValue === STORAGE.pending) {
                arProvider.setTxInterval(Object.keys(txJson)[0]!, props.artifactId);
                setTxPending(true);
            }
        }
    }, [arProvider, props.artifactId])

    React.useEffect(() => {
        window.addEventListener(STORAGE.txUpdate, () => {
            if (localStorage.getItem(props.artifactId)) {
                setTxPending(true);
            }
        })
    }, [props.artifactId]);

    function getIcon() {
        if (txPending) {
            return (
                <Loader alt />
            )
        }
        else {
            return (
                <IconButton
                    type={"primary"}
                    src={props.bookmarkIds.includes(props.artifactId) ? ASSETS.bookmarkSelected : ASSETS.bookmark}
                    handlePress={() => { arProvider.toggleUserBookmark!(props.artifactId) }}
                    disabled
                />
            )
        }
    }
    return (
        <S.BookmarkToggle>
            {getIcon()}
        </S.BookmarkToggle>
    );
}

export default function ArtifactTable(props: IProps) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    function getLink(id: string, label: string) {
        const url = `${urls.artifact}${id}`;
        return (
                <S.Link>
                    <Link to={url}>
                        <span>{label}</span>
                    </Link>
                </S.Link>
            
        )
    }

    React.useEffect(() => {
        if (props.data) {
            (async function () {
                const bookmarkIds = await await arProvider.getBookmarksIds();
                setData(props.data.contracts.map((element: any) => {
                    const row: ArtifactTableRowType = {
                        title: getLink(element.node.id, getTagValue(element.node.tags, TAGS.keys.artifactName)),
                        dateCreated: formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), "epoch")
                    }
                    if (props.showBookmarks) {
                        row.bookmark = (
                            <BookmarkToggle artifactId={element.node.id} bookmarkIds={bookmarkIds} />
                        );
                    }

                    if (getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none) {
                        return row;
                    }
                    else {
                        return null;
                    }
                }).filter((element: any) => element !== null));
            })();

        }
    }, [props.data, props.showBookmarks, arProvider, arProvider.walletAddress])

    function getHeader() {
        const header: TableHeaderType = {
            title: { width: props.showBookmarks ? "65%" : "75%", align: "left" as AlignType },
            dateCreated: { width: "25%", align: "left" as AlignType }
        }

        if (props.showBookmarks) {
            header.bookmark = { width: "10%", align: "center" as AlignType };
        }

        return header;
    }

    return data && data.length > 0 ? (
        <Table
            title={LANGUAGE.artifacts}
            header={getHeader() as any}
            data={data}
            recordsPerPage={PAGINATOR}
            showPageNumbers={false}
            handleUpdateFetch={props.handleUpdateFetch}
            cursors={props.cursors}
        />
    ) : null
}