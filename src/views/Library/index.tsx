import { useParams } from 'react-router-dom';

import { OwnerAccount } from 'global/Owner/OwnerAccount';
import { URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

export default function Library() {
	const { id } = useParams();

	return <OwnerAccount walletAddress={id} header={LANGUAGE.library.header1} tabs={URLS.library} />;
}
