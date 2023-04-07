export interface IProps {
	id: string | null;
	image: string | null;
	title: string | null;
	description: string | null;
	dateCreated: string | null;
	count: number | null;
	totalContributions: string | null;
	contributors: any | null;
	ownerMaintained: boolean;
	contribPercent: string | null;
}
