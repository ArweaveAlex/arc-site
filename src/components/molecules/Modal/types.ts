import React from "react";

export interface IProps {
	title: string;
	handleClose: () => void;
	children: React.ReactNode;
}
