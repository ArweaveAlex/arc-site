import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as artifactActions from 'redux/artifacts/actions';
import { RootState } from 'redux/store';
import { getBookmarkIds, setBookmarkIds, getArtifactById } from 'gql/artifacts';

import { ArtifactViewSingle } from 'views/Artifact/ArtifactSingle/ArtifactViewSingle';

import { ActionDropdown } from 'components/atoms/ActionDropdown';

import { getHashUrl, getTagValue } from 'helpers/utils';
import * as urls from 'helpers/urls';
import { LANGUAGE } from 'helpers/language';
import { TAGS, STORAGE } from 'helpers/config';
import { ArtifactDetailType } from 'helpers/types';
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

// TODO - Preview
// TODO - Bookmark Notification
// TODO - Stamp
// TODO - Permafacts Link
// TODO - Action dropdown on all tabes, disable each action conditionally
export default function ArtifactsTableActionDropdown(props: IProps) {
	const dispatch = useDispatch();
	const bookmarksReducer = useSelector((state: RootState) => state.bookmarksReducer);

	const [copied, setCopied] = React.useState<boolean>(false);
	const [showPreview, setShowPreview] = React.useState<boolean>(false);

	const [bookmarkIdsState, setBookmarkIdsState] = React.useState<string[]>([]);

	// TODO - EscHandler Wrapper
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
				console.log(bookmarksReducer.owner === props.owner);
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

		await setBookmarkIds(props.owner!, updatedBookmarks);
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
		setShowPreview(false);
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
			{ fn: handleShowPreview, closeOnAction: false, subComponent: getPreview(), label: showPreview ? LANGUAGE.closePreview : LANGUAGE.previewArtifact, disabled: false },
			{ fn: () => console.log('STAMP'), closeOnAction: false, subComponent: null, label: LANGUAGE.stamp, disabled: false },
			{ fn: () => console.log('Assert on Permafacts'), closeOnAction: false, subComponent: null, label: LANGUAGE.assertOnPermafacts, disabled: false },
			{ fn: copyArtifactId, closeOnAction: false, subComponent: null, label: copied ? LANGUAGE.copied : LANGUAGE.copyArtifactId, disabled: false },
			{ fn: handleViewRedirect, closeOnAction: true, subComponent: null, label: LANGUAGE.openInNewTab, disabled: false },
			{
				fn: () => handleBookmarkStateUpdate(props.artifactId),
				closeOnAction: false,
				subComponent: null,
				label: bookmarkIdsState.includes(props.artifactId) ? LANGUAGE.removeFromBookmarks : LANGUAGE.addtoBookmarks,
				disabled: props.bookmarksDisabled,
			}
		];
	}

	return <ActionDropdown handleCallback={handleCallback} actions={getActions()} />;
}
