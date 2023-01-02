import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "redux/artifacts/actions";
import { RootState } from "redux/store";
import { getCollectionIds, setCollectionIds } from "gql/artifacts";

import { ArtifactSearch } from "./ArtifactSearch";

import { IconButton } from "components/atoms/IconButton";
import { Table } from "components/organisms/Table";

import { LANGUAGE } from "config/language";
import { ASSETS, PAGINATOR, STORAGE, TAGS, ARTIFACT_TYPES } from "config";

import {
    AlignType,
    ArtifactTableRowType,
    TableHeaderType
} from "config/types";

import {
    formatDate,
    getTagValue
} from "config/utils";

import * as urls from "config/urls";
import { IProps } from "./types";
import * as S from "./styles";

function CollectionToggle(props: {
    artifactId: string,
    selected: boolean,
    handleCollectionUpdate: (artifactId: string) => void
}) {
    return (
        <S.CollectionToggle>
            <IconButton
                type={"primary"}
                src={props.selected ? ASSETS.bookmarkSelected : ASSETS.collection}
                handlePress={() => props.handleCollectionUpdate(props.artifactId)}

            />
        </S.CollectionToggle>
    )
}

export default function ArtifactTable(props: IProps) {
    const dispatch = useDispatch();
    const collectionsReducer = useSelector((state: RootState) => state.collectionsReducer);

    const [data, setData] = React.useState<any>(null);
    const [collectionIdsState, setCollectionIdsState] = React.useState<string[]>([]);

    function getTitleWidth() {
        if (props.showCollections && props.showPoolIds) {
            return "55%";
        }
        else if (props.showCollections || props.showPoolIds) {
            return "65%";
        }
        else {
            return "75%";
        }
    }

    function getHeader() {
        const header: TableHeaderType = {
            type: { width: "5%", align: "center" as AlignType },
            title: { width: getTitleWidth(), align: "left" as AlignType },
            dateCreated: { width: "20%", align: "left" as AlignType }
        }

        if (props.showPoolIds) {
            header.pool = { width: "10%", align: "left" as AlignType };
        }

        if (props.showCollections) {
            header.collection = { width: "10%", align: "center" as AlignType };
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
                <ReactSVG src={artifactType.icon} />
            </S.TypeContainer>
        )

    }

    function getLink(url: string, label: string) {
        return (
            <S.Link>
                <Link to={url} tabIndex={-1}>
                    <p>{label}</p>
                </Link>
            </S.Link>

        )
    }

    function getCollection(artifactId: string) {
        return (
            <CollectionToggle
                artifactId={artifactId}
                selected={collectionIdsState.includes(artifactId)}
                handleCollectionUpdate={(artifactId: string) => handleCollectionStateUpdate(artifactId)}
            />
        )
    }

    async function handleCollectionStateUpdate(artifactId: string) {
        const updatedCollections: string[] = [];
        for (let i = 0; i < collectionIdsState.length; i++) {
            updatedCollections.push(collectionIdsState[i]);
        }
        const index = updatedCollections.indexOf(artifactId);
        if (index > -1) {
            updatedCollections.splice(index, 1);
        }
        else {
            updatedCollections.push(artifactId);
        }
        await setCollectionIds(props.owner!, updatedCollections);
    }

    React.useEffect(() => {
        (async function () {
            if (props.owner) {
                if (collectionsReducer.owner === props.owner) {
                    setCollectionIdsState(collectionsReducer.ids);
                }
                else {
                    const collectionIdsState = await getCollectionIds(props.owner);

                    dispatch(actions.setCollection({
                        owner: props.owner,
                        ids: collectionIdsState
                    }))
                    setCollectionIdsState(collectionIdsState);
                }
            }
        })();
    }, [props.owner, dispatch, collectionsReducer.owner, collectionsReducer.ids])

    React.useEffect(() => {
        if (props.data) {
            (async function () {
                setData(props.data.contracts.map((element: any) => {
                    const row: ArtifactTableRowType = {
                        type: getType(getTagValue(element.node.tags, TAGS.keys.artifactType)),
                        title: getLink(`${urls.artifact}${element.node.id}`, getTagValue(element.node.tags, TAGS.keys.artifactName)),
                        dateCreated: formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), "epoch")
                    }
                    if (props.showPoolIds) {
                        row.pool = getLink(`${urls.pool}${getTagValue(element.node.tags, TAGS.keys.poolId)}`, getTagValue(element.node.tags, TAGS.keys.poolId));
                    }
                    if (props.showCollections) {
                        row.collection = getCollection(element.node.id);
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
        else {
            setData(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collectionIdsState, props.data, props.showCollections])

    return (
        <Table
            title={LANGUAGE.artifacts}
            action={
                <ArtifactSearch 
                    id={props.id}
                    cursorObject={props.cursorObject}
                    setSearchRequested={(searchRequested: boolean) => props.setSearchRequested(searchRequested)}
                    disabled={!props.data}
                />
            }
            header={getHeader()}
            data={data}
            recordsPerPage={PAGINATOR}
            showPageNumbers={false}
            handleCursorFetch={props.handleCursorFetch}
            cursors={props.cursors}
        />
    );
}