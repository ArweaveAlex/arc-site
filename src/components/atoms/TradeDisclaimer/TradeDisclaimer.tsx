import parse from 'html-react-parser';

import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';

import * as S from './styles';

export default function TradeDisclaimer(props: { handleClose: () => void }) {
	return (
		<Modal header={language.tradeDisclaimerHeader} handleClose={props.handleClose}>
			<S.Wrapper>
				<p>{parse(language.tradeDisclaimerInfo)}</p>
			</S.Wrapper>
		</Modal>
	);
}
