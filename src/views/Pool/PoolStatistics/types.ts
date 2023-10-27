import { GQLNodeResponseType, PoolType } from 'arcframework';

export interface IProps {
	headerData: PoolType;
	artifacts: GQLNodeResponseType[] | null;
}
