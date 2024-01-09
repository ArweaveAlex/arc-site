import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Portal } from 'components/atoms/Portal';
import { search } from 'gql';
import { ARTIFACT_TYPES, ASSETS, DOM, STORAGE, TAGS } from 'helpers/config';
import { language } from 'helpers/language';
import { GQLNodeResponseType } from 'helpers/types';
import * as urls from 'helpers/urls';
import { getRelativeDate, getTagValue } from 'helpers/utils';
import { checkDesktop, checkWindowResize } from 'helpers/window';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function Search(props: { handleClose: () => void }) {
	const isCancelled = React.useRef<boolean>(false);

	const [value, setValue] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [desktop, setDesktop] = React.useState(checkDesktop());
	const [timer, setTimer] = React.useState<any>(null);
	const [results, setResults] = React.useState<GQLNodeResponseType[] | null>(null);
	const [showResults, setShowResults] = React.useState<boolean>(true);
	const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

	function handleWindowResize() {
		if (checkDesktop()) {
			setDesktop(true);
		} else {
			setDesktop(false);
		}
	}

	checkWindowResize(handleWindowResize);

	React.useEffect(() => {
		setTimer(
			setTimeout(() => {
				if (value) {
					handleSearch('timer');
				} else {
					handleClear();
				}
			}, 500)
		);

		return () => clearTimeout(timer);
	}, [value]);

	async function handleSearch(e: any) {
		isCancelled.current = false;
		if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click' || e === 'timer') {
			if (value) {
				try {
					setLoading(true);
					const searchResults = await search({ term: value, cursor: null });
					if (!isCancelled.current) {
						setResults(searchResults.data);
						setLoading(false);
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}

	function handleChange(value: string) {
		clearTimeout(timer);
		setValue(value);
	}

	function handleClear() {
		isCancelled.current = true;
		setValue('');
		setResults(null);
		setLoading(false);
		setSearchOpen(false);
	}

	function getResults() {
		if (loading) {
			return (
				<S.DLWrapper>
					<span>{`${language.loading}...`}</span>
				</S.DLWrapper>
			);
		}
		if (results !== null) {
			if (!results.length) {
				return (
					<S.DLWrapper>
						<span>{language.noResults}</span>
					</S.DLWrapper>
				);
			} else {
				return (
					<S.DRWrapper>
						{results.map((result: GQLNodeResponseType, index: number) => {
							return (
								<ArtifactSearchResult
									key={index}
									result={result}
									handleClear={() => handleClear()}
									handleClose={props.handleClose}
								/>
							);
						})}
					</S.DRWrapper>
				);
			}
		} else return null;
	}

	function getSearch(useDesktop: boolean) {
		let InputWrapper: any;
		let SearchWrapper: any;
		let ResultsWrapper: any;
		let RelativeWrapper: any;
		if (useDesktop) {
			InputWrapper = S.DInput;
			SearchWrapper = S.DSearchWrapper;
			ResultsWrapper = S.DResultsWrapper;
			RelativeWrapper = S.RWrapper;
		} else {
			InputWrapper = S.MInput;
			SearchWrapper = S.MSearchWrapper;
			ResultsWrapper = S.MResultsWrapper;
			RelativeWrapper = S.MRWrapper;
		}

		return (
			<S.DWrapper>
				<CloseHandler active={loading || results !== null} disabled={false} callback={() => setShowResults(false)}>
					<SearchWrapper>
						{!useDesktop && (
							<S.MCloseWrapper>
								<IconButton
									type={'primary'}
									src={ASSETS.arrowPrevious}
									handlePress={() => setSearchOpen(false)}
									dimensions={{ wrapper: 22.5, icon: 12.5 }}
								/>
							</S.MCloseWrapper>
						)}
						<RelativeWrapper>
							<S.DSearchIcon disabled={false}>
								<ReactSVG src={ASSETS.search} />
							</S.DSearchIcon>
							<InputWrapper
								disabled={false}
								invalid={false}
								value={value}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
								onClick={() => setShowResults(true)}
								placeholder={language.search}
								hasData={loading || results !== null}
							/>
							<S.DClearWrapper>
								<IconButton
									src={ASSETS.close}
									type={'primary'}
									handlePress={() => handleClear()}
									disabled={!value}
									warning
									dimensions={{ wrapper: 22.5, icon: 12.5 }}
									tooltip={language.clear}
								/>
							</S.DClearWrapper>
						</RelativeWrapper>
					</SearchWrapper>
					{(loading || results !== null) && showResults && (
						<ResultsWrapper className={useDesktop ? 'border-wrapper-alt2' : ''}>{getResults()}</ResultsWrapper>
					)}
				</CloseHandler>
			</S.DWrapper>
		);
	}

	return desktop ? (
		getSearch(true)
	) : (
		<>
			<S.MWrapper onClick={() => setSearchOpen(true)}>
				<span>{language.search}</span>
				<S.MIconWrapper>
					<ReactSVG src={ASSETS.search} />
				</S.MIconWrapper>
			</S.MWrapper>
			{searchOpen && (
				<Portal node={DOM.overlay}>
					<S.MSWrapper>{getSearch(false)}</S.MSWrapper>
				</Portal>
			)}
		</>
	);
}

function ArtifactSearchResult(props: {
	result: GQLNodeResponseType | null;
	handleClear: () => void;
	handleClose: () => void;
}) {
	let resultType: 'pool' | 'artifact' = null;

	const poolVersions = Object.keys(TAGS.values.poolVersions).map(
		(version: string) => TAGS.values.poolVersions[version]
	);

	const appType = getTagValue(props.result.node.tags, TAGS.keys.appType);
	if (appType !== STORAGE.none && poolVersions.includes(appType)) {
		resultType = 'pool';
	}
	const poolId = getTagValue(props.result.node.tags, TAGS.keys.poolId);
	if (poolId !== STORAGE.none) {
		resultType = 'artifact';
	}

	let redirect: string | null = null;
	let resultTitle: string | null = null;
	let resultInfo: string | null = null;
	let resultIcon: string | null = null;

	switch (resultType) {
		case 'pool':
			const uploaderTxId = getTagValue(props.result.node.tags, TAGS.keys.uploaderTxId);
			redirect = `${urls.pool}${uploaderTxId !== STORAGE.none ? uploaderTxId : props.result.node.id}`;
			resultTitle = getTagValue(props.result.node.tags, TAGS.keys.poolName);
			resultInfo = `${language.pool.subheader1} · ${getRelativeDate(props.result.node.block.timestamp * 1000)}`;
			resultIcon = ASSETS.pool;
			break;
		case 'artifact':
			const artifactType = getTagValue(props.result.node.tags, TAGS.keys.artifactType);
			redirect = `${urls.artifact}${props.result.node.id}`;
			resultTitle = getTagValue(props.result.node.tags, TAGS.keys.ansTitle);
			resultInfo = `${artifactType} · ${getRelativeDate(
				Number(getTagValue(props.result.node.tags, TAGS.keys.dateCreated))
			)}`;
			resultIcon = ARTIFACT_TYPES[artifactType].icon;
			break;
	}

	return (
		<S.AWrapper>
			<Link
				to={redirect}
				onClick={() => {
					props.handleClear();
					props.handleClose();
				}}
			>
				<S.AInfo>
					<S.AIcon>
						<ReactSVG src={resultIcon} />
					</S.AIcon>
					<S.AInfo1>
						{props.result ? (
							<p>{resultTitle}</p>
						) : (
							<S.ATLoader>
								<Loader placeholder />
							</S.ATLoader>
						)}
						<S.AInfoFlex>
							{props.result ? (
								<>
									<span>{resultInfo}</span>
								</>
							) : (
								<S.AILoader>
									<Loader placeholder />
								</S.AILoader>
							)}
						</S.AInfoFlex>
					</S.AInfo1>
				</S.AInfo>
			</Link>
		</S.AWrapper>
	);
}
