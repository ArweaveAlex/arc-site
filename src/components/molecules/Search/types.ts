export interface IProps {
    placeholder: string;
    handleSearchFetch: (term: string | null) => void;
    disabled: boolean;
}