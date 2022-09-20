import { Dispatch, SetStateAction } from "react";

export interface IProps {
    nPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
    scrollRef: any;
}