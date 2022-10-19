import { KeyValueType, TableHeaderType } from "@/types"

export interface IProps {
    title: string,
    header: TableHeaderType,
    data: KeyValueType[],
    recordsPerPage: number,
    toggleUserFavorite?: (artefactId: string, userWallet: string) => void
}