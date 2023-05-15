import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	ArweaveClient,
	getBookmarkIds,
	getHashUrl,
	getTagValue,
	NotificationResponseType,
	setBookmarkIds,
	STORAGE,
	TAGS,
} from 'arcframework';

import { ActionDropdown } from 'components/atoms/ActionDropdown';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { FactWidget } from 'global/FactWidget';
import { StampWidget } from 'global/StampWidget';
import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import * as artifactActions from 'state/artifacts/actions';
import { RootState } from 'state/store';
import { ArtifactRendererSingle } from 'views/Artifact/ArtifactSingle/ArtifactRendererSingle';

import * as S from './styles';
import { IProps } from './types';

function Preview(props: { artifactId: string; useModal: boolean; handleClose: () => void }) {
	let renderer: any = null;
	if (props.artifactId) {
		renderer = <ArtifactRendererSingle artifactId={props.artifactId} />;
	}

	return props.useModal ? (
		<Modal header={language.artifactPreview} handleClose={() => props.handleClose()}>
			<S.ModalPreviewContainer id={DOM.preview}>{renderer}</S.ModalPreviewContainer>
		</Modal>
	) : (
		<S.PreviewContainer id={DOM.preview}>{renderer}</S.PreviewContainer>
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
	const [showFactWidget, setShowFactWidget] = React.useState<boolean>(false);

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
						artifactActions.setBookmarks({
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

		dispatch(
			artifactActions.setBookmarks({
				owner: props.owner,
				ids: updatedBookmarks,
			})
		);

		const bookmarkResponse = await setBookmarkIds(props.owner!, updatedBookmarks);

		setBookmarkNotification({
			status: bookmarkResponse.status,
			message: bookmarkResponse.status === 200 ? language.bookmarksUpdated : language.errorOccurred,
		});
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
					handleClose={() => handlePreviewCallback()}
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
						showWalletConnect={true}
						warp={arClient.warpDefault}
						handleStampCallback={() => props.handleStampCallback()}
					/>
				</S.StampWidgetContainer>
			),
			active: showStampWidget,
		};
	}

	function getFactWidget() {
		return {
			node: (
				<S.FactWidgetContainer>
					<FactWidget txId={props.artifactId} walletAddress={arProvider.walletAddress} showWalletConnect={true} />
				</S.FactWidgetContainer>
			),
			active: showFactWidget,
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
		setShowFactWidget(false);
		handleView();
	}

	function handleShowStampWidget() {
		setShowStampWidget(!showStampWidget);
		setShowPreview(false);
		setShowFactWidget(false);
	}

	function handleShowFactWidget() {
		setShowFactWidget(!showFactWidget);
		setShowPreview(false);
		setShowStampWidget(false);
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
		setShowFactWidget(false);
	}

	function handlePreviewCallback() {
		setShowPreview(false);
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
				label: showPreview ? language.closePreview : language.previewArtifact,
				disabled: false,
				loading: false,
			},
			{
				fn: handleShowStampWidget,
				closeOnAction: false,
				subComponent: getStampWidget(),
				label: showStampWidget ? language.close : language.stamp,
				disabled: false,
				loading: false,
			},
			{
				fn: handleShowFactWidget,
				closeOnAction: false,
				subComponent: getFactWidget(),
				label: showFactWidget ? language.close : language.factMarket,
				disabled: false,
				loading: false,
			},
			{
				fn: copyArtifactId,
				closeOnAction: false,
				subComponent: null,
				label: copied ? language.copied : language.copyArtifactId,
				disabled: false,
				loading: false,
			},
			{
				fn: handleViewRedirect,
				closeOnAction: true,
				subComponent: null,
				label: language.openInNewTab,
				disabled: false,
				loading: false,
			},
			{
				fn: () => handleBookmarkStateUpdate(props.artifactId),
				closeOnAction: false,
				subComponent: null,
				label: bookmarkIdsState.includes(props.artifactId) ? language.removeFromBookmarks : language.addtoBookmarks,
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
