import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "redux/artifacts/actions";
import { RootState } from "redux/store";
import { getBookmarks, setBookmarks } from "gql/artifacts";

import { Notification } from "components/atoms/Notification";
import { Button } from "components/atoms/Button";
import { IconButton } from "components/atoms/IconButton";

import { Table } from "components/organisms/Table";

import { LANGUAGE } from "language";
import { ASSETS, PAGINATOR, STORAGE, TAGS, ARTIFACT_TYPES } from "config";

import {
    AlignType,
    ArtifactTableRowType,
    TableHeaderType,
    BookmarkResponseType
} from "types";

import {
    formatDate,
    getTagValue
} from "utils";

import * as urls from "urls";
import { IProps } from "./types";
import * as S from "./styles";

function BookmarkToggle(props: {
    artifactId: string,
    selected: boolean,
    handleBookmarkUpdate: (artifactId: string) => void
}) {
    return (
        <S.BookmarkToggle>
            <IconButton
                type={"primary"}
                src={props.selected ? ASSETS.bookmarkSelected : ASSETS.bookmark}
                handlePress={() => props.handleBookmarkUpdate(props.artifactId)}

            />
        </S.BookmarkToggle>
    );
}

export default function ArtifactTable(props: IProps) {
    const dispatch = useDispatch();
    const bookmarksReducer = useSelector((state: RootState) => state.bookmarksReducer);

    const [data, setData] = React.useState<any>(null);
    const [bookmarkIds, setBookmarkIds] = React.useState<string[]>([]);
    const [bookmarkResponse, setBookmarkResponse] = React.useState<BookmarkResponseType>({
        status: null,
        message: null
    })

    function getHeader() {
        const header: TableHeaderType = {
            type: { width: "5%", align: "center" as AlignType },
            title: { width: props.showBookmarks ? "65%" : "75%", align: "left" as AlignType },
            dateCreated: { width: "20%", align: "left" as AlignType }
        }

        if (props.showBookmarks) {
            header.bookmark = { width: "10%", align: "center" as AlignType };
        }

        return header;
    }

    function getType(type: string) {
        let artifactType = ARTIFACT_TYPES[type];
        if (!artifactType) {
            artifactType = ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
        }
        return (
            <S.TypeContainer>
                <ReactSVG src={artifactType.icon}/>
            </S.TypeContainer>
        )

    }

    function getLink(id: string, label: string) {
        const url = `${urls.artifact}${id}`;
        return (
            <S.Link>
                <Link to={url} tabIndex={-1}>
                    <p>{label}</p>
                </Link>
            </S.Link>

        )
    }

    function checkEditActionDisabled() {
        if (bookmarksReducer.ids.length === bookmarkIds.length) {
            return true;
        }
        return false;
    }

    function getEditAction() {
        if (props.showBookmarks) {
            return (
                <Button
                    type={"secondary"}
                    label={LANGUAGE.setBookmarks}
                    handlePress={handleEditBookmarks}
                    disabled={checkEditActionDisabled()}
                />
            )
        }
        else {
            return null;
        }
    }

    function getBookmark(artifactId: string) {
        return (
            <BookmarkToggle
                artifactId={artifactId}
                selected={bookmarkIds.includes(artifactId)}
                handleBookmarkUpdate={(artifactId: string) => handleBookmarkStateUpdate(artifactId)}
            />
        )
    }

    async function handleEditBookmarks() {
        setBookmarkResponse(await setBookmarks(props.owner!, bookmarkIds));
    }

    function handleBookmarkStateUpdate(artifactId: string) {
        const updatedBookmarks: string[] = [];
        for (let i = 0; i < bookmarkIds.length; i++) {
            updatedBookmarks.push(bookmarkIds[i]);
        }
        const index = updatedBookmarks.indexOf(artifactId);
        if (index > -1) {
            updatedBookmarks.splice(index, 1);
        } else {
            updatedBookmarks.push(artifactId);
        }
        setBookmarkIds(updatedBookmarks);
    }

    React.useEffect(() => {
        (async function () {
            if (props.owner) {
                if (bookmarksReducer.owner === props.owner) {
                    setBookmarkIds(bookmarksReducer.ids);
                }
                else {
                    const bookmarkIds = await getBookmarks(props.owner);
                    dispatch(actions.setBookmarks({
                        owner: props.owner,
                        ids: bookmarkIds
                    }))
                    setBookmarkIds(bookmarkIds);
                }
            }
        })();
    }, [props.owner, dispatch, bookmarksReducer.owner, bookmarksReducer.ids])

    React.useEffect(() => {
        if (props.data) {
            (async function () {
                setData(props.data.contracts.map((element: any) => {
                    console.log(element)

                    const row: ArtifactTableRowType = {
                        type: getType(getTagValue(element.node.tags, TAGS.keys.artifactType)),
                        title: getLink(element.node.id, getTagValue(element.node.tags, TAGS.keys.artifactName)),
                        dateCreated: formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), "epoch")
                    }
                    if (props.showBookmarks) {
                        row.bookmark = (getBookmark(element.node.id));
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookmarkIds, props.data, props.showBookmarks])

    return data && data.length > 0 ? (
        <>
            {bookmarkResponse.status &&
                <Notification
                    type={(bookmarkResponse.status === 200) ? "success" : "warning"}
                    message={bookmarkResponse.message!}
                    callback={() => setBookmarkResponse({ status: null, message: null })}
                />
            }
            <Table
                title={LANGUAGE.artifacts}
                titleAction={getEditAction()}
                header={getHeader()}
                data={data}
                recordsPerPage={PAGINATOR}
                showPageNumbers={false}
                handleUpdateFetch={props.handleUpdateFetch}
                cursors={props.cursors}
            />
        </>
    ) : null
}