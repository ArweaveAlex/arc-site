import React from 'react';

export interface IProps {
	poolId: string | null;
	header: string | null;
	subheader: React.ReactNode;
	totalContributions: string | null;
	contributors: any | null;
	disabled: boolean;
}
