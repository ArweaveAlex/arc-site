import parse from 'html-react-parser';

import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';

import * as S from './styles';

export default function CollectionDisclaimer(props: { handleClose: () => void }) {
	return (
		<Modal header={language.collectionDisclaimerHeader} handleClose={props.handleClose}>
			<S.Wrapper>
				<p>{parse(language.collectionDisclaimerInfo)}</p>
			</S.Wrapper>
		</Modal>
	);
}
