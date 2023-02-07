import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stamps from '@permaweb/stampjs';
import { ArweaveClient } from 'clients/arweave';

import * as artifactActions from 'redux/artifacts/actions';
import { RootState } from 'redux/store';
import { getBookmarkIds, setBookmarkIds, getArtifactById } from 'gql/artifacts';

import { ArtifactViewSingle } from 'views/Artifact/ArtifactSingle/ArtifactViewSingle';

import { Notification } from 'components/atoms/Notification';
import { ActionDropdown } from 'components/atoms/ActionDropdown';

import { getHashUrl, getTagValue } from 'helpers/utils';
import * as urls from 'helpers/urls';
import { LANGUAGE } from 'helpers/language';
import { TAGS, STORAGE } from 'helpers/config';
import { ArtifactDetailType, NotificationResponseType } from 'helpers/types';
import { IProps } from './types';
import * as S from './styles';

function Preview(props: { artifactId: string; callback: () => void }) {
	const [data, setData] = React.useState<ArtifactDetailType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (props.artifactId && !data) {
				setData(await getArtifactById(props.artifactId));
			}
		})();
	}, [props.artifactId, data]);

	return (
		<S.PreviewContainer>
			<ArtifactViewSingle data={data} />
		</S.PreviewContainer>
	);
}

// TODO - Full stamp widget as Stamp subcomponent if user has stamp tokens, enable form field with qty arg amount
export default function ArtifactsTableActionDropdown(props: IProps) {
	const dispatch = useDispatch();

	const arClient = new ArweaveClient();
	const stamps = Stamps.init({ warp: arClient.warp });

	const bookmarksReducer = useSelector((state: RootState) => state.bookmarksReducer);

	const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
	const [copied, setCopied] = React.useState<boolean>(false);
	const [showPreview, setShowPreview] = React.useState<boolean>(false);
	const [bookmarkNotification, setBookmarkNotification] = React.useState<NotificationResponseType | null>(null);

	const [stampDisabled, setStampDisabled] = React.useState<boolean>(true);
	const [stampCheckLoading, setStampCheckLoading] = React.useState<boolean>(false);
	const [stampNotification, setStampNotification] = React.useState<NotificationResponseType | null>(null);

	const [bookmarkIdsState, setBookmarkIdsState] = React.useState<string[]>([]);

	const escFunction = React.useCallback(
		(e: any) => {
			if (e.key === 'Escape' && showPreview) {
				setShowPreview(false);
			}
		},
		[showPreview]
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

	// TODO - Disabled if connected wallet has stamped not stamp total
	React.useEffect(() => {
		(async function () {
			if (props.artifactId && dropdownOpen) {
				setStampCheckLoading(true);
				const stamp = await stamps.count(props.artifactId);
				setStampCheckLoading(false);
				if (stamp && stamp.total <= 0) {
					setStampDisabled(false);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.artifactId, dropdownOpen]);

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
	if (associationId && associationId !== STORAGE.none) {
		redirect = `${getHashUrl(window.location.origin)}${urls.thread}${associationId}/${props.artifactId}`;
	} else {
		redirect = `${getHashUrl(window.location.origin)}${urls.artifact}${props.artifactId}`;
	}

	function getPreview() {
		return {
			node: <Preview artifactId={props.artifactId} callback={() => setShowPreview(false)} />,
			active: showPreview,
		};
	}

	function handleShowPreview() {
		setShowPreview(!showPreview);
	}

	function handleViewRedirect() {
		window.open(redirect, '_blank');
		setShowPreview(false);
	}

	function handleCallback() {
		setDropdownOpen(!dropdownOpen);
		setShowPreview(false);
	}

	function handleBookmarkCallback() {
		setBookmarkNotification(null);
		handleCallback();
	}

	function handleStampCallback() {
		setStampNotification(null);
		handleCallback();
	}

	const copyArtifactId = React.useCallback(async () => {
		if (props.artifactId) {
			await navigator.clipboard.writeText(props.artifactId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [props.artifactId]);

	const handleStamp = React.useCallback(async () => {
		if (props.artifactId) {
			setStampCheckLoading(true);
			const stamp = await stamps.stamp(props.artifactId);
			const stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
			setStampCheckLoading(false);
			setStampDisabled(true);
			setStampNotification({
				status: stampSuccess ? 200 : 500,
				message: stampSuccess ? LANGUAGE.artifactStamped : LANGUAGE.errorOccurred,
			});
			props.handleCallback();
		}
	}, [stamps, props]);

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
				fn: handleStamp,
				closeOnAction: false,
				subComponent: null,
				label: LANGUAGE.stamp,
				disabled: stampDisabled,
				loading: stampCheckLoading,
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
				label: bookmarkIdsState.includes(props.artifactId) ? LANGUAGE.removeFromBookmarks : LANGUAGE.addtoBookmarks,
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
			{stampNotification && (
				<Notification
					message={stampNotification.message}
					type={stampNotification.status === 200 ? 'success' : 'warning'}
					callback={handleStampCallback}
				/>
			)}
			<ActionDropdown handleCallback={handleCallback} handleShowDropdown={() => setDropdownOpen(!dropdownOpen)} actions={getActions()} />
		</>
	);
}
