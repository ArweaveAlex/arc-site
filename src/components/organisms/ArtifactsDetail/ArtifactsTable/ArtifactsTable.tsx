import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import {
	ARTIFACT_CONTRACT,
	formatDate,
	formatKeywordString,
	getTagValue,
	PAGINATOR,
	STORAGE,
	TAGS,
} from 'arcframework';

import { Checkbox } from 'components/atoms/Checkbox';
import { Table } from 'components/molecules/Table';
import { ARTIFACT_TYPES, ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { AlignType, ArtifactTableRowType, TableHeaderType } from 'helpers/types';
import * as urls from 'helpers/urls';

import { ArtifactsTableActionDropdown } from './ArtifactsTableActionDropdown';
import * as S from './styles';
import { IProps } from './types';

export default function ArtifactsTable(props: IProps) {
	const [data, setData] = React.useState<{ data: ArtifactTableRowType; active: boolean; viewed: boolean }[] | null>(
		null
	);
	const [selectedCallbackIdsState, setSelectedCallbackIdsState] = React.useState<string[]>([]);

	const [stamps, _setStamps] = React.useState<any>(null);
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
				display: language.select,
			};
		}

		header.type = {
			width: '5%',
			align: 'center' as AlignType,
			display: language.type,
		};

		header.title = {
			width: getTitleWidth(),
			align: 'left' as AlignType,
			display: language.name,
		};

		header.dateCreated = {
			width: '20%',
			align: 'left' as AlignType,
			display: language.dateCreated,
		};

		if (props.showPoolIds) {
			header.pool = {
				width: '10%',
				align: 'left' as AlignType,
				display: language.pool.subheader1,
			};
		}

		if (props.showActions) {
			header.actions = {
				width: '10%',
				align: 'center' as AlignType,
				display: language.actions,
			};
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
		);
	}

	function getArtifactLinkLabel(tags: { [key: string]: any }[]) {
		return parse(formatKeywordString(getTagValue(tags, TAGS.keys.artifactName), '@'));
	}

	function handleView(id: string) {
		if (!sessionStorage.getItem(id)) {
			setUpdateViews(!updateViews);
			sessionStorage.setItem(id, '-');
		}
	}

	function getArtifactLink(id: string, tags: { [key: string]: any }[]) {
		let redirect: string;
		const associationId = getTagValue(tags, TAGS.keys.associationId);
		const artifactType = getTagValue(tags, TAGS.keys.artifactType);

		if (associationId && associationId !== STORAGE.none && artifactType !== TAGS.values.ebookArtifactType) {
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
					<S.TradeIcon>{checkTradability(tags) && <ReactSVG src={ASSETS.trade} />}</S.TradeIcon>
					<S.Icon>{checkMedia(tags) && <ReactSVG src={ASSETS.media} />}</S.Icon>
					<S.AssociationIcon>{checkAssociation(tags) && <ReactSVG src={ASSETS.association} />}</S.AssociationIcon>
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

	function getActionDropdown(artifactId: string, tags: { [key: string]: any }[]) {
		return (
			<ArtifactsTableActionDropdown
				artifactId={artifactId}
				artifactType={getTagValue(tags, TAGS.keys.artifactType)}
				artifactName={getTagValue(tags, TAGS.keys.ansTitle)}
				artifactContractSrc={getTagValue(tags, TAGS.keys.contractSrc)}
				dateCreated={getTagValue(tags, TAGS.keys.dateCreated)}
				tags={tags}
				owner={props.owner}
				ownerActionDisabled={props.ownerActionDisabled}
				handleStampCallback={() => setUpdateStamps(!updateStamps)}
				handleViewedCallback={() => setUpdateViews(!updateViews)}
				usePreviewModal={props.usePreviewModal}
			/>
		);
	}

	function getDisabled(id: string) {
		return props.disabledSelectedCallbackIds ? props.disabledSelectedCallbackIds.includes(id) : false;
	}

	function getCallback(id: string, contractSrcDisabled: boolean) {
		return (
			<S.CheckboxContainer>
				<Checkbox
					checked={selectedCallbackIdsState.includes(id)}
					disabled={getDisabled(id) || contractSrcDisabled}
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
		if (props.action) {
			return props.action;
		}
		return null;
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
								let disabled: boolean = false;
								if (props.disabledContractSrc) {
									const contractSrc = getTagValue(element.node.tags, TAGS.keys.contractSrc);
									disabled = contractSrc !== ARTIFACT_CONTRACT.src;
								}

								row.callback = getCallback(element.node.id, disabled);
							}

							row.type = getType(getTagValue(element.node.tags, TAGS.keys.artifactType));
							row.title = getArtifactLink(element.node.id, element.node.tags);
							row.dateCreated = formatDate(getTagValue(element.node.tags, TAGS.keys.dateCreated), 'epoch');

							if (props.showPoolIds) {
								row.pool = getPoolLink(
									`${urls.pool}${getTagValue(element.node.tags, TAGS.keys.poolId)}`,
									getTagValue(element.node.tags, TAGS.keys.poolId)
								);
							}

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
	}, [selectedCallbackIdsState, updateViews, stamps, props.data, props.showActions]);

	React.useEffect(() => {
		if (props.selectedCallbackIds) {
			setSelectedCallbackIdsState(props.selectedCallbackIds);
		}
	}, [props.selectedCallbackIds]);

	return (
		<Table
			title={language.artifacts}
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

function checkMedia(tags: { [key: string]: any }[]) {
	return (
		(getTagValue(tags, TAGS.keys.mediaIds) !== '{}' &&
			getTagValue(tags, TAGS.keys.mediaIds) !== '[]' &&
			getTagValue(tags, TAGS.keys.mediaIds) !== STORAGE.none &&
			getTagValue(tags, TAGS.keys.mediaIds) !== '' &&
			getTagValue(tags, TAGS.keys.mediaIds) !== `{"":""}`) ||
		getTagValue(tags, TAGS.keys.artifactType) === TAGS.values.imageArtifactType
	);
}

function checkAssociation(tags: { [key: string]: any }[]) {
	return (
		getTagValue(tags, TAGS.keys.associationId) !== '' && getTagValue(tags, TAGS.keys.associationId) !== STORAGE.none
	);
}

function checkTradability(tags: { [key: string]: any }[]) {
	return (
		getTagValue(tags, TAGS.keys.contractSrc) !== '' &&
		getTagValue(tags, TAGS.keys.contractSrc) === ARTIFACT_CONTRACT.src
	);
}
