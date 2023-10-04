import { GQLResponseType, PoolType } from 'arcframework';

export interface IProps {
	headerData: PoolType;
	artifacts: GQLResponseType[] | null;
}
