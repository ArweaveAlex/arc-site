export interface IProps {
    placeholder: string;
    handleSearchFetch: (term: string | null) => void;
    handleClear: () => void;
    disabled: boolean;
}