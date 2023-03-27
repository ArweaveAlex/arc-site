import { Button } from 'components/atoms/Button';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

// TODO: Create / Edit verbiage
export default function CollectionsManageHeader() {
	function handlePreviewCollection() {
		console.log('Preview Collection');
	}

	function handleEditArtifacts() {
		console.log('Edit Selected Artifacts');
	}

	function handleCancel() {
		console.log('Cancel Collection');
	}

	return (
		<S.HeaderContent>
			<S.HeaderContentFixed>
				<S.Header>
					<S.Header1>{LANGUAGE.manageCollection}</S.Header1>
					<S.Actions>
						<S.Action>
							<Button
								type={'primary'}
								label={LANGUAGE.previewCollection}
								handlePress={() => handlePreviewCollection()}
								noMinWidth
							/>
						</S.Action>
						<S.Action>
							<Button
								type={'primary'}
								label={LANGUAGE.editSelectedArtifacts}
								handlePress={() => handleEditArtifacts()}
								noMinWidth
							/>
						</S.Action>
						<S.Action>
							<Button type={'warning'} label={LANGUAGE.cancel} handlePress={() => handleCancel()} noMinWidth />
						</S.Action>
					</S.Actions>
				</S.Header>
			</S.HeaderContentFixed>
		</S.HeaderContent>
	);
}
