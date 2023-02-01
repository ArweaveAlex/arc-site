import React from 'react';
import parse from 'html-react-parser';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

import { ArtifactsSearch } from '../ArtifactsSearch';
import { ArtifactsTableActionDropdown } from './ArtifactsTableActionDropdown';

import { Checkbox } from 'components/atoms/Checkbox';
import { Table } from 'components/organisms/Table';

import { LANGUAGE } from 'helpers/language';
import { ASSETS, PAGINATOR, STORAGE, TAGS, ARTIFACT_TYPES } from 'helpers/config';

import { AlignType, ArtifactTableRowType, KeyValueType, TableHeaderType } from 'helpers/types';

import { formatArtifactType, formatDate, formatMessagingText, getTagValue } from 'helpers/utils';

import * as urls from 'helpers/urls';
import { IProps } from './types';
import * as S from './styles';

export default function ArtifactsTable(props: IProps) {
	const [data, setData] = React.useState<any>(null);
	const [selectedCallbackIdsState, setSelectedCallbackIdsState] = React.useState<string[]>([]);

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

		header.title = {
			width: getTitleWidth(),
			align: 'left' as AlignType,
			display: LANGUAGE.name,
		};

		header.type = {
			width: '10%',
			align: 'left' as AlignType,
			display: LANGUAGE.type,
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
		const hasMedia =
			getTagValue(tags, TAGS.keys.mediaIds) !== '{}' &&
			getTagValue(tags, TAGS.keys.mediaIds) !== STORAGE.none &&
			getTagValue(tags, TAGS.keys.mediaIds) !== '' &&
			getTagValue(tags, TAGS.keys.mediaIds) !== `{"":""}`;
		const hasAssociation = getTagValue(tags, TAGS.keys.associationId) !== '' && getTagValue(tags, TAGS.keys.associationId) !== STORAGE.none;

		let artifactType = ARTIFACT_TYPES[type];
		if (!artifactType) {
			artifactType = ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
		}
		
		return (
			<S.TypeContainer>
				<S.TypeLabel>
					<p>{formatArtifactType(artifactType.label)}</p>
				</S.TypeLabel>
				<S.Icons>
					<S.Icon>{hasMedia && <ReactSVG src={ASSETS.media} />}</S.Icon>
					<S.Divider />
					<S.AssociationIcon>{hasAssociation && <ReactSVG src={ASSETS.association} />}</S.AssociationIcon>
				</S.Icons>
			</S.TypeContainer>
		);
	}

	function getArtifactLinkLabel(tags: KeyValueType[]) {
		return parse(formatMessagingText(getTagValue(tags, TAGS.keys.artifactName)));
	}

	function getArtifactLink(id: string, tags: KeyValueType[]) {
		let redirect: string;
		const associationId = getTagValue(tags, TAGS.keys.associationId);

		if (associationId && associationId !== STORAGE.none) {
			redirect = `${urls.thread}${associationId}/${id}`;
		} else {
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
				</S.ALinkWrapper>
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

	function getActionDropdown(artifactId: string, tags: KeyValueType[]) {
		return <ArtifactsTableActionDropdown artifactId={artifactId} tags={tags} owner={props.owner} bookmarksDisabled={props.bookmarksDisabled} />;
	}

	function getCallback(id: string) {
		return (
			<S.CheckboxContainer>
				<Checkbox checked={selectedCallbackIdsState.includes(id)} disabled={false} handleSelect={() => props.selectCallback(id)} />
			</S.CheckboxContainer>
		);
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
		if (props.data) {
			(async function () {
				setData(
					props.data.contracts
						.map((element: any) => {
							const row: ArtifactTableRowType = {};
							if (props.selectCallback) {
								row.callback = getCallback(element.node.id);
							}

							row.title = getArtifactLink(element.node.id, element.node.tags);
							row.type = getType(getTagValue(element.node.tags, TAGS.keys.artifactType), element.node.tags);
							row.dateCreated = formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), 'epoch');

							if (props.showPoolIds) {
								row.pool = getPoolLink(`${urls.pool}${getTagValue(element.node.tags, TAGS.keys.poolId)}`, getTagValue(element.node.tags, TAGS.keys.poolId));
							}
							if (props.showActions) {
								row.actions = getActionDropdown(element.node.id, element.node.tags);
							}
							if (getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none) {
								return row;
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
	}, [selectedCallbackIdsState, props.data, props.showActions]);

	React.useEffect(() => {
		if (props.selectedCallbackIds) {
			setSelectedCallbackIdsState(props.selectedCallbackIds);
		}
	}, [props.selectedCallbackIds]);

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
