import React from "react";

export interface IProps {
    poolId: string;
    header: string;
    subheader: React.ReactNode;
    totalContributions: string;
    contributors: any;
}