import React from "react";

export interface IProps {
    collectionId: string;
    header: string;
    subheader: React.ReactNode;
    totalContributions: string;
    contributors: any;
}