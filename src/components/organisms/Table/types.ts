import { KeyValueStringType } from "@/types"

export interface IProps {
    title: string,
    header: { [key: string]: { width: string } },
    data: KeyValueStringType[],
    recordsPerPage: number
}