import { KeyValueStringType, TableHeaderType } from "@/types"

export interface IProps {
    title: string,
    header: TableHeaderType,
    data: KeyValueStringType[],
    recordsPerPage: number
}