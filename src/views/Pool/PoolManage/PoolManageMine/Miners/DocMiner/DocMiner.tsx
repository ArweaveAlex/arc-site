import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { DocTemplate } from 'views/Docs/DocsDetail/DocTemplate';

import { IProps } from '../types';

import * as S from './styles';

export default function DocMiner(props: IProps) {
	const [showDocs, setShowDocs] = React.useState<boolean>(false);

	return (
		<>
			<S.Wrapper>
				<S.Logo>
					<ReactSVG src={ASSETS.cli} />
				</S.Logo>
				<S.Title>
					<S.H2>{props.id.charAt(0).toUpperCase() + props.id.slice(1)}</S.H2>
				</S.Title>
				<S.Info>{language.sourceNotSupportedInfo}</S.Info>
				<S.Action>
					<Button type={'alt2'} label={language.viewDocs} handlePress={() => setShowDocs(true)} noMinWidth />
				</S.Action>
			</S.Wrapper>
			{showDocs && (
				<Modal header={language.docs} handleClose={() => setShowDocs(false)} useMax>
					<DocTemplate doc={props.doc} id={props.id} />
				</Modal>
			)}
		</>
	);
}
