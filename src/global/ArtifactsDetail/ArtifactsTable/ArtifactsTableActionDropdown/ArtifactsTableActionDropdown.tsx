import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useArweaveProvider } from 'providers/ArweaveProvider';
import { ArweaveClient } from 'clients/arweave';

import * as artifactActions from 'redux/artifacts/actions';
import { RootState } from 'redux/store';
import { getBookmarkIds, setBookmarkIds, getArtifactById } from 'gql/artifacts';

import { StampWidget } from 'global/StampWidget';
import { ArtifactViewSingle } from 'views/Artifact/ArtifactSingle/ArtifactViewSingle';

import { Modal } from 'components/molecules/Modal';
import { Notification } from 'components/atoms/Notification';
import { ActionDropdown } from 'components/atoms/ActionDropdown';

import { getHashUrl, getTagValue } from 'helpers/utils';
import * as urls from 'helpers/urls';
import { LANGUAGE } from 'helpers/language';
import { TAGS, STORAGE } from 'helpers/config';
import { ArtifactDetailType, NotificationResponseType } from 'helpers/types';
import { IProps } from './types';
import * as S from './styles';

function Preview(props: { artifactId: string; useModal: boolean; handleClose: () => void }) {
	const [data, setData] = React.useState<ArtifactDetailType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (props.artifactId && !data) {
				setData(await getArtifactById(props.artifactId));
			}
		})();
	}, [props.artifactId, data]);

	return props.useModal ? (
		<Modal header={null} handleClose={() => props.handleClose()}>
			<S.ModalPreviewContainer>
				<ArtifactViewSingle data={data} />
			</S.ModalPreviewContainer>
		</Modal>
	) : (
		<S.PreviewContainer>
			<ArtifactViewSingle data={data} />
		</S.PreviewContainer>
	);
}

export default function ArtifactsTableActionDropdown(props: IProps) {
	const dispatch = useDispatch();

	const arClient = new ArweaveClient();
	const arProvider = useArweaveProvider();

	const bookmarksReducer = useSelector((state: RootState) => state.bookmarksReducer);

	const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
	const [copied, setCopied] = React.useState<boolean>(false);
	const [showPreview, setShowPreview] = React.useState<boolean>(false);
	const [bookmarkNotification, setBookmarkNotification] = React.useState<NotificationResponseType | null>(null);

	const [showStampWidget, setShowStampWidget] = React.useState<boolean>(false);

	const [bookmarkIdsState, setBookmarkIdsState] = React.useState<string[]>([]);

	const escFunction = React.useCallback(
		(e: any) => {
			if (e.key === 'Escape' && ((showPreview && !props.usePreviewModal) || showStampWidget)) {
				setShowPreview(false);
				if (showStampWidget) {
					setShowStampWidget(false);
				}
			}
		},
		[showPreview, showStampWidget, props.usePreviewModal]
	);

	React.useEffect(() => {
		document.addEventListener('keydown', escFunction, false);
		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	React.useEffect(() => {
		(async function () {
			if (props.owner) {
				if (bookmarksReducer.owner === props.owner) {
					setBookmarkIdsState(bookmarksReducer.ids);
				} else {
					const bookmarkIdsState = await getBookmarkIds(props.owner);
					dispatch(
						artifactActions.setBookmark({
							owner: props.owner,
							ids: bookmarkIdsState,
						})
					);
					setBookmarkIdsState(bookmarkIdsState);
				}
			}
		})();
	}, [props.owner, dispatch, bookmarksReducer.owner, bookmarksReducer.ids]);

	async function handleBookmarkStateUpdate(artifactId: string) {
		const updatedBookmarks: string[] = [];
		for (let i = 0; i < bookmarkIdsState.length; i++) {
			updatedBookmarks.push(bookmarkIdsState[i]);
		}
		const index = updatedBookmarks.indexOf(artifactId);
		if (index > -1) {
			updatedBookmarks.splice(index, 1);
		} else {
			updatedBookmarks.push(artifactId);
		}

		setBookmarkNotification(await setBookmarkIds(props.owner!, updatedBookmarks));
	}

	let redirect: string;
	const associationId = getTagValue(props.tags, TAGS.keys.associationId);
	const artifactType = getTagValue(props.tags, TAGS.keys.artifactType);

	if (associationId && associationId !== STORAGE.none) {
		redirect = `${getHashUrl(window.location.origin)}${urls.thread}${associationId}/${
			props.artifactId
		}?type=${artifactType}`;
	} else {
		redirect = `${getHashUrl(window.location.origin)}${urls.artifact}${props.artifactId}`;
	}

	function getPreview() {
		return {
			node: (
				<Preview
					artifactId={props.artifactId}
					useModal={props.usePreviewModal}
					handleClose={() => handleCallback()}
				/>
			),
			active: showPreview,
		};
	}

	function getStampWidget() {
		return {
			node: (
				<S.StampWidgetContainer>
					<StampWidget
						txId={props.artifactId}
						walletAddress={arProvider.walletAddress}
						setWalletModalVisible={() => arProvider.setWalletModalVisible(true)}
						warp={arClient.warp}
						handleStampCallback={() => props.handleStampCallback()}
						showWalletConnect={true}
					/>
				</S.StampWidgetContainer>
			),
			active: showStampWidget,
		};
	}

	function handleView() {
		if (!sessionStorage.getItem(props.artifactId)) {
			props.handleViewedCallback();
			sessionStorage.setItem(props.artifactId, '-');
		}
	}

	function handleShowPreview() {
		setShowPreview(!showPreview);
		setShowStampWidget(false);
		handleView();
	}

	function handleShowStampWidget() {
		setShowStampWidget(!showStampWidget);
		setShowPreview(false);
	}

	function handleViewRedirect() {
		window.open(redirect, '_blank');
		setShowPreview(false);
		handleView();
	}

	function handleCallback() {
		setDropdownOpen(!dropdownOpen);
		setShowPreview(false);
		setShowStampWidget(false);
	}

	function handleBookmarkCallback() {
		setBookmarkNotification(null);
		handleCallback();
	}

	const copyArtifactId = React.useCallback(async () => {
		if (props.artifactId) {
			await navigator.clipboard.writeText(props.artifactId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [props.artifactId]);

	function getActions() {
		return [
			{
				fn: handleShowPreview,
				closeOnAction: false,
				subComponent: getPreview(),
				label: showPreview ? LANGUAGE.closePreview : LANGUAGE.previewArtifact,
				disabled: false,
				loading: false,
			},
			{
				fn: handleShowStampWidget,
				closeOnAction: false,
				subComponent: getStampWidget(),
				label: showStampWidget ? LANGUAGE.close : LANGUAGE.stamp,
				disabled: false,
				loading: false,
			},
			{
				fn: copyArtifactId,
				closeOnAction: false,
				subComponent: null,
				label: copied ? LANGUAGE.copied : LANGUAGE.copyArtifactId,
				disabled: false,
				loading: false,
			},
			{
				fn: handleViewRedirect,
				closeOnAction: true,
				subComponent: null,
				label: LANGUAGE.openInNewTab,
				disabled: false,
				loading: false,
			},
			{
				fn: () => handleBookmarkStateUpdate(props.artifactId),
				closeOnAction: false,
				subComponent: null,
				label: bookmarkIdsState.includes(props.artifactId)
					? LANGUAGE.removeFromBookmarks
					: LANGUAGE.addtoBookmarks,
				disabled: props.bookmarksDisabled,
				loading: false,
			},
		];
	}

	return (
		<>
			{bookmarkNotification && (
				<Notification
					message={bookmarkNotification.message}
					type={bookmarkNotification.status === 200 ? 'success' : 'warning'}
					callback={handleBookmarkCallback}
				/>
			)}
			<ActionDropdown
				open={dropdownOpen}
				handleCallback={handleCallback}
				handleShowDropdown={() => setDropdownOpen(!dropdownOpen)}
				actions={getActions()}
				closeDisabled={showPreview && props.usePreviewModal}
			/>
		</>
	);
}
