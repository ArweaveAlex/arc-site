import { Dispatch, SetStateAction } from "react";

export interface IProps {
    nPages: number;
    currentPage: number;
    // setCurrentPage: () => void;
    setCurrentPage: Dispatch<SetStateAction<number>>
}