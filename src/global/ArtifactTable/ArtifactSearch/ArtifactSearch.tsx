import React from "react";
import { useDispatch } from "react-redux";

import { Search } from "components/molecules/Search";

import { runSearch, initSearch } from "search";

import * as searchActions from "redux/search/actions"
import { splitArray } from "config/utils";
import { PAGINATOR, SEARCH } from "config";
import { LANGUAGE } from "config/language";
import { IProps } from "./types";

export default function ArtifactSearch(props: IProps) {
    const dispatch = useDispatch();

    const [searchIndeces, setSearchIndeces] = React.useState<string[] | null>(null);
    const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
    const [searchResultIds, setSearchResultIds] = React.useState<string[]>([]);

    const handleIdUpdate = React.useCallback((searchResultIds: any[], cursorValue: string) => {
        const splitIds = splitArray(searchResultIds, PAGINATOR);
        const searchReducerList = [];
        for (let i = 0; i < splitIds.length; i++) {
            searchReducerList.push({ [`${SEARCH.cursorPrefix}-${i}`]: splitIds[i] })
        }
        const searchReducerObject = { [cursorValue]: searchReducerList };
        dispatch(searchActions.setSearchIds(searchReducerObject));
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            setSearchIndeces(await initSearch(props.id.value));
        })();
    }, [props.id]);

    React.useEffect(() => {
        (async function () {
            if (searchTerm) {
                handleClear();
            }
            if (searchTerm && searchIndeces && searchResultIds.length <= 0) {
                await runSearch(
                    searchTerm,
                    searchIndeces,
                    (resultIds: string[]) => {
                        setSearchResultIds((prevArray: string[]) => [...prevArray, ...resultIds]);
                    }
                );
            }
        })();
    }, [searchTerm, searchIndeces, searchResultIds.length]);

    React.useEffect(() => {
        if (searchResultIds && searchResultIds.length > 0) {
            handleIdUpdate(searchResultIds, props.cursorObject.value);
        }
    }, [searchResultIds, props.cursorObject.value, handleIdUpdate])

    function handleClear() {
        setSearchTerm(null);
        setSearchResultIds([]);
        dispatch(searchActions.clearSearchIds());
    }

    return (
        <Search
            placeholder={searchIndeces ?
                LANGUAGE.searchArtifacts : `${LANGUAGE.searchInitializing}...`}
            handleSearchFetch={(term: string) => setSearchTerm(term)}
            handleClear={handleClear}
            disabled={!searchIndeces}
        />
    )
}