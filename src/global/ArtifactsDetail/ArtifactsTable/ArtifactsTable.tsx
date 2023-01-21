import React from "react";
import parse from "html-react-parser";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as artifactActions from "redux/artifacts/actions";
import { RootState } from "redux/store";
import { getCollectionIds, setCollectionIds } from "gql/artifacts";

import { ArtifactsSearch } from "../ArtifactsSearch";

import { IconButton } from "components/atoms/IconButton";
import { Table } from "components/organisms/Table";

import { LANGUAGE } from "helpers/language";
import { ASSETS, PAGINATOR, STORAGE, TAGS, ARTIFACT_TYPES } from "helpers/config";

import {
    AlignType,
    ArtifactTableRowType,
    KeyValueType,
    TableHeaderType
} from "helpers/types";

import {
    formatDate,
    formatMessagingText,
    getTagValue
} from "helpers/utils";

import * as urls from "helpers/urls";
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
                src={props.selected ? ASSETS.collectionSelected : ASSETS.collection}
                handlePress={() => props.handleCollectionUpdate(props.artifactId)}

            />
        </S.CollectionToggle>
    )
}

export default function ArtifactsTable(props: IProps) {
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

    function getArtifactLinkLabel(tags: KeyValueType[]) {
        return parse(formatMessagingText(getTagValue(tags, TAGS.keys.artifactName)));
    }

    function getArtifactLink(id: string, tags: KeyValueType[]) {
        let redirect: string;
        const associationId = getTagValue(tags, TAGS.keys.associationId);
        const hasMedia = (getTagValue(tags, TAGS.keys.mediaIds) !== "{}") &&
            (getTagValue(tags, TAGS.keys.mediaIds) !== STORAGE.none) &&
            (getTagValue(tags, TAGS.keys.mediaIds) !== "") &&
            (getTagValue(tags, TAGS.keys.mediaIds) !== `{"":""}`);
        const hasAssociation = (getTagValue(tags, TAGS.keys.associationId) !== "") &&
            (getTagValue(tags, TAGS.keys.associationId) !== STORAGE.none);

        if (associationId && (associationId !== STORAGE.none)) {
            redirect = `${urls.thread}${associationId}/${id}`
        }
        else {
            redirect = `${urls.artifact}${id}`;
        }

        return (
            <S.LinkWrapper>
                <S.ALinkWrapper>
                    <S.ALink>
                        <Link to={redirect} tabIndex={-1}>
                            {getArtifactLinkLabel(tags)}
                        </Link>
                    </S.ALink>
                    <S.ALinkNT>
                        <Link to={redirect} target={"_blank"} tabIndex={-1}>
                            <ReactSVG src={ASSETS.newTab} />
                        </Link>
                    </S.ALinkNT>
                </S.ALinkWrapper>
                <S.Icons>
                    <S.Icon>
                        {hasMedia &&
                            <ReactSVG src={ASSETS.media} />
                        }
                    </S.Icon>
                    <S.AssociationIcon>
                        {hasAssociation &&
                            <ReactSVG src={ASSETS.association} />
                        }
                    </S.AssociationIcon>
                </S.Icons>
            </S.LinkWrapper>
        )
    }

    function getPoolLink(url: string, label: string) {
        return (
            <S.PLink>
                <Link to={url} tabIndex={-1}>
                    {label}
                </Link>
            </S.PLink>

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

                    dispatch(artifactActions.setCollection({
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
                        title: getArtifactLink(element.node.id, element.node.tags),
                        dateCreated: formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), "epoch")
                    }
                    if (props.showPoolIds) {
                        row.pool = getPoolLink(`${urls.pool}${getTagValue(element.node.tags, TAGS.keys.poolId)}`, getTagValue(element.node.tags, TAGS.keys.poolId));
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
                <ArtifactsSearch
                    id={props.id}
                    indexIds={props.indexIds}
                    cursorObject={props.cursorObject}
                    setSearchRequested={(searchRequested: boolean) => props.setSearchRequested(searchRequested)}
                    disabled={!props.data}
                    owner={props.owner}
                />
            }
            header={getHeader()}
            data={data}
            recordsPerPage={PAGINATOR}
            showPageNumbers={false}
            handleCursorFetch={props.handleCursorFetch}
            cursors={props.cursors}
            showNoResults={props.showNoResults}
        />
    );
}