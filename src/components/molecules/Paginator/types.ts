import { Dispatch, SetStateAction } from "react";

export interface IProps {
    pages: number;
    currentPage: number;
    // setCurrentPage: () => void;
    setCurrentPage: Dispatch<SetStateAction<number>>
}