export interface IProps {
	poolId: string | null;
	header: string | null;
	totalContributions: string | null;
	dateCreated: string | null;
	contributors: any | null;
	contribPercent: string | null;
	handleShowModal: () => void;
}
