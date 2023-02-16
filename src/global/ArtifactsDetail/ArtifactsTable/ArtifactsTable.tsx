import React from 'react';
import parse from 'html-react-parser';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

import Stamps from '@permaweb/stampjs';
import { ArweaveClient } from 'clients/arweave';

import { ArtifactsSearch } from '../ArtifactsSearch';
import { ArtifactsTableActionDropdown } from './ArtifactsTableActionDropdown';

import { Checkbox } from 'components/atoms/Checkbox';
import { Table } from 'components/organisms/Table';

import { LANGUAGE } from 'helpers/language';
import { ASSETS, PAGINATOR, STORAGE, TAGS, ARTIFACT_TYPES } from 'helpers/config';

import { AlignType, ArtifactTableRowType, GQLResponseType, KeyValueType, TableHeaderType } from 'helpers/types';

import { formatDate, formatMessagingText, getTagValue, checkMedia, checkAssociation } from 'helpers/utils';

import * as urls from 'helpers/urls';
import { IProps } from './types';
import * as S from './styles';

export default function ArtifactsTable(props: IProps) {
	const [data, setData] = React.useState<{ data: ArtifactTableRowType; active: boolean; viewed: boolean }[] | null>(
		null
	);
	const [selectedCallbackIdsState, setSelectedCallbackIdsState] = React.useState<string[]>([]);

	const [stamps, setStamps] = React.useState<any>(null);
	const [updateStamps, setUpdateStamps] = React.useState<boolean>(false);
	const [updateViews, setUpdateViews] = React.useState<boolean>(false);

	function getTitleWidth() {
		if (props.showActions && props.showPoolIds) {
			return '55%';
		} else if (props.showActions || props.showPoolIds) {
			return '65%';
		} else {
			return '75%';
		}
	}

	function getHeader() {
		const header: TableHeaderType = {};

		if (props.selectCallback) {
			header.callback = {
				width: '3.5%',
				align: 'center' as AlignType,
				display: null,
			};
		}

		header.type = {
			width: '5%',
			align: 'center' as AlignType,
			display: LANGUAGE.type,
		};

		header.title = {
			width: getTitleWidth(),
			align: 'left' as AlignType,
			display: LANGUAGE.name,
		};

		header.dateCreated = {
			width: '20%',
			align: 'left' as AlignType,
			display: LANGUAGE.dateCreated,
		};

		if (props.showPoolIds) {
			header.pool = {
				width: '10%',
				align: 'left' as AlignType,
				display: LANGUAGE.pool.subheader1,
			};
		}

		header.stamps = {
			width: '7.5%',
			align: 'center' as AlignType,
			display: LANGUAGE.stamps,
		};

		if (props.showActions) {
			header.actions = {
				width: '10%',
				align: 'center' as AlignType,
				display: LANGUAGE.actions,
			};
		}

		return header;
	}

	function getType(type: string, tags: KeyValueType[]) {
		let artifactType = ARTIFACT_TYPES[type];
		if (!artifactType) {
			artifactType = ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
		}
		return (
			<S.TypeContainer>
				<ReactSVG src={artifactType.icon} />
			</S.TypeContainer>
		);
	}

	function getArtifactLinkLabel(tags: KeyValueType[]) {
		return parse(formatMessagingText(getTagValue(tags, TAGS.keys.artifactName)));
	}

	function handleView(id: string) {
		if (!sessionStorage.getItem(id)) {
			setUpdateViews(!updateViews);
			sessionStorage.setItem(id, '-');
		}
	}

	function getArtifactLink(id: string, tags: KeyValueType[]) {
		let redirect: string;
		const associationId = getTagValue(tags, TAGS.keys.associationId);
		const artifactType = getTagValue(tags, TAGS.keys.artifactType);

		if (associationId && associationId !== STORAGE.none) {
			redirect = `${urls.thread}${associationId}/${id}?type=${artifactType}`;
		} else {
			redirect = `${urls.artifact}${id}`;
		}

		return (
			<S.LinkWrapper>
				<S.ALinkWrapper>
					<S.ALink>
						<Link to={redirect} tabIndex={-1} onClick={() => handleView(id)}>
							{getArtifactLinkLabel(tags)}
						</Link>
					</S.ALink>
				</S.ALinkWrapper>
				<S.Icons>
					<S.Icon>{checkMedia(tags) && <ReactSVG src={ASSETS.media} />}</S.Icon>
					<S.AssociationIcon>
						{checkAssociation(tags) && <ReactSVG src={ASSETS.association} />}
					</S.AssociationIcon>
				</S.Icons>
			</S.LinkWrapper>
		);
	}

	function getPoolLink(url: string, label: string) {
		return (
			<S.PLink>
				<Link to={url} tabIndex={-1}>
					{label}
				</Link>
			</S.PLink>
		);
	}

	function getStampCount(id: string) {
		return (
			<S.StampContainer>
				<p>{stamps && stamps[id] ? stamps[id].total : `-`}</p>
			</S.StampContainer>
		);
	}

	function getActionDropdown(artifactId: string, tags: KeyValueType[]) {
		return (
			<ArtifactsTableActionDropdown
				artifactId={artifactId}
				tags={tags}
				owner={props.owner}
				bookmarksDisabled={props.bookmarksDisabled}
				handleStampCallback={() => setUpdateStamps(!updateStamps)}
				handleViewedCallback={() => setUpdateViews(!updateViews)}
				usePreviewModal={props.usePreviewModal}
			/>
		);
	}

	function getCallback(id: string) {
		return (
			<S.CheckboxContainer>
				<Checkbox
					checked={selectedCallbackIdsState.includes(id)}
					disabled={false}
					handleSelect={() => props.selectCallback(id)}
				/>
			</S.CheckboxContainer>
		);
	}

	function getActive(id: string) {
		if (props.selectCallback) {
			return selectedCallbackIdsState.includes(id);
		} else {
			return false;
		}
	}

	function getViewed(id: string) {
		return sessionStorage.getItem(id) !== null && sessionStorage.getItem(id) !== undefined;
	}

	function getAction() {
		if (props.showSearch) {
			return (
				<ArtifactsSearch
					id={props.id}
					indexIds={props.indexIds}
					cursorObject={props.cursorObject}
					setSearchRequested={(searchRequested: boolean) => props.setSearchRequested(searchRequested)}
					disabled={!props.data}
					owner={props.owner}
				/>
			);
		} else {
			return null;
		}
	}

	React.useEffect(() => {
		if (props.selectedCallbackIds) {
			setSelectedCallbackIdsState(props.selectedCallbackIds);
		}
	}, [props.selectedCallbackIds]);

	React.useEffect(() => {
		if (props.data) {
			(async function () {
				setData(
					props.data.contracts
						.map((element: any) => {
							const row: ArtifactTableRowType = {};
							if (props.selectCallback) {
								row.callback = getCallback(element.node.id);
							}

							row.type = getType(
								getTagValue(element.node.tags, TAGS.keys.artifactType),
								element.node.tags
							);
							row.title = getArtifactLink(element.node.id, element.node.tags);
							row.dateCreated = formatDate(
								getTagValue(element.node.tags, TAGS.keys.dateCreated),
								'epoch'
							);

							if (props.showPoolIds) {
								row.pool = getPoolLink(
									`${urls.pool}${getTagValue(element.node.tags, TAGS.keys.poolId)}`,
									getTagValue(element.node.tags, TAGS.keys.poolId)
								);
							}

							row.stamps = getStampCount(element.node.id);

							if (props.showActions) {
								row.actions = getActionDropdown(element.node.id, element.node.tags);
							}
							if (getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none) {
								return {
									data: row,
									active: getActive(element.node.id),
									viewed: getViewed(element.node.id),
								};
							} else {
								return null;
							}
						})
						.filter((element: any) => element !== null)
				);
			})();
		} else {
			setData(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCallbackIdsState, updateViews, stamps, props.data, props.showActions]);

	React.useEffect(() => {
		if (props.selectedCallbackIds) {
			setSelectedCallbackIdsState(props.selectedCallbackIds);
		}
	}, [props.selectedCallbackIds]);

	React.useEffect(() => {
		(async function () {
			if (props.data && props.data.contracts.length > 0) {
				const arClient = new ArweaveClient();
				const stamps = Stamps.init({ warp: arClient.warp });
				setStamps(await stamps.counts(props.data.contracts.map((element: GQLResponseType) => element.node.id)));
			}
		})();
	}, [props.data, updateStamps]);

	return (
		<Table
			title={LANGUAGE.artifacts}
			action={getAction()}
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
