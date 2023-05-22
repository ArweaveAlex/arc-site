import { useParams } from 'react-router-dom';

import { OwnerAccount } from 'global/Owner/OwnerAccount';
import { URLS } from 'helpers/config';
import { language } from 'helpers/language';

export default function Library() {
	const { id } = useParams();

	return (
		<div className={'view-wrapper max-cutoff'}>
			<OwnerAccount walletAddress={id} header={language.library.header1} tabs={URLS.library} />
		</div>
	);
}
