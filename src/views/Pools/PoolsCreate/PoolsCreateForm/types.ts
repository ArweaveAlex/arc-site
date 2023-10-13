import * as ArcFramework from 'arcframework';

export interface IProps {
	image: any;
	setImage: (e: any) => void;
	imageBuffer: any;
	setImageBuffer: (e: any) => void;
	title: string | null;
	setTitle: (e: any) => void;
	contributionPercentage: number | null;
	setContributionPercentage: (e: any) => void;
	tradeable: boolean;
	setTradeable: () => void;
	topics: string[] | null;
	setTopics: (e: any) => void;
	keywords: string[] | null;
	setKeywords: (e: any, index: number) => void;
	addKeyword: () => void;
	removeKeyword: (index: number) => void;
	description: string | null;
	setDescription: (e: any) => void;
	handleSave: () => void;
	loading: boolean;
	invalidTitle: boolean;
	poolCreateSuccess: boolean;
	setPoolCreateSuccess: (success: boolean) => void;
	poolCreateError: boolean;
	setPoolCreateError: (error: boolean) => void;
	createdPool: ArcFramework.PoolConfigType | null;
}
