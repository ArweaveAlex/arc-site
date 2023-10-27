import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Checkbox } from 'components/atoms/Checkbox';
import { IconButton } from 'components/atoms/IconButton';
import { Portal } from 'components/atoms/Portal';
import { ARTIFACT_TYPES, ASSETS, DOM } from 'helpers/config';
import { language } from 'helpers/language';
import { formatArtifactType } from 'helpers/utils';
import * as windowUtils from 'helpers/window';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactsFilter(props: IProps) {
	const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
	const [selectedArtifactTypes, setSelectedArtifactTypes] = React.useState<string[]>([]);

	React.useEffect(() => {
		setSelectedArtifactTypes(props.currentFilteredArtifactTypes);
	}, [props.currentFilteredArtifactTypes]);

	React.useEffect(() => {
		if (filterOpen) {
			windowUtils.hideDocumentBody();
		} else {
			windowUtils.showDocumentBody();
		}
	}, [filterOpen]);

	const toggleArtifact = (artifactType: string) => {
		if (selectedArtifactTypes.includes(artifactType)) {
			setSelectedArtifactTypes((prev) => prev.filter((type) => type !== artifactType));
		} else {
			setSelectedArtifactTypes((prev) => [...prev, artifactType]);
		}
	};

	return (
		<>
			<Button
				type={'alt2'}
				label={language.filterResults}
				icon={ASSETS.filter}
				handlePress={() => setFilterOpen(true)}
				disabled={props.disabled}
				noMinWidth
			/>
			{filterOpen && (
				<Portal node={DOM.sideNavigation}>
					<S.FOWrapper>
						<S.FOContent>
							<CloseHandler active={filterOpen} callback={() => setFilterOpen(false)} disabled={false}>
								<S.FOTitle>
									<p>{language.filterResults}</p>
									<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={() => setFilterOpen(false)} />
								</S.FOTitle>
								<S.FOList>
									<S.FOSection>
										<S.FOSectionTitle>
											<p>{language.artifactType}</p>
										</S.FOSectionTitle>
										{Object.keys(ARTIFACT_TYPES).map((key: string, index: number) => {
											return (
												<S.FOSectionLine key={index}>
													<Checkbox
														checked={selectedArtifactTypes.includes(ARTIFACT_TYPES[key].label)}
														disabled={false}
														handleSelect={() => toggleArtifact(ARTIFACT_TYPES[key].label)}
													/>
													<p>{formatArtifactType(ARTIFACT_TYPES[key].label)}</p>
													<ReactSVG src={ARTIFACT_TYPES[key].icon} />
												</S.FOSectionLine>
											);
										})}
									</S.FOSection>
									<Button
										type={'alt2'}
										active
										label={language.applyChanges}
										handlePress={() => {
											props.setFilteredArtifactTypes(selectedArtifactTypes);
											setFilterOpen(false);
										}}
										disabled={!props.currentFilteredArtifactTypes.length && !selectedArtifactTypes.length}
										noMinWidth
									/>
								</S.FOList>
							</CloseHandler>
						</S.FOContent>
					</S.FOWrapper>
				</Portal>
			)}
		</>
	);
}
