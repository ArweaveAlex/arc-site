import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const ModalWrapper = styled.div``;

export const Form = styled.form`
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const FormWrapper = styled.div``;

export const FormContainer = styled.div`
	max-width: ${STYLING.dimensions.formWidthMin};
	margin: 50px auto 0 auto;
`;

export const SubmitWrapper = styled.div`
	margin: 40px auto 15px auto;
	button {
		width: fit-content;
		margin: 0 auto;
	}
`;
