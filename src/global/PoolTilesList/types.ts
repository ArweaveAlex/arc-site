import { PoolAdditionalPropsType } from 'arcframework';

export type IProps = {
	header: string;
	emptyDataMessage: string;
	data: PoolAdditionalPropsType[];
	redirect: string | ((id: string) => string);
};
