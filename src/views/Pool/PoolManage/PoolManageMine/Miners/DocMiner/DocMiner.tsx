import { DocTemplate } from 'views/Docs/DocsDetail/DocTemplate';

import { IProps } from '../types';

export default function DocMiner(props: IProps) {
	return <DocTemplate doc={props.doc} id={props.id} />;
}
