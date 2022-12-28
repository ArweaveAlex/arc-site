import React from "react";
import { useDispatch } from "react-redux";

import { Search } from "components/molecules/Search";

import { runSearch, initSearch } from "search";

import { splitArray } from "config/utils";
import { PAGINATOR, SEARCH } from "config";
import { LANGUAGE } from "config/language";
import { IProps } from "./types";

export default function ArtifactSearch(props: IProps) {
    const dispatch = useDispatch();

    const [searchIndeces, setSearchIndeces] = React.useState<string[] | null>(null);
    const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
    const [searchResultsIds, setSearchResultsIds] = React.useState<string[]>([]);

    React.useEffect(() => {
        (async function () {
            setSearchIndeces(await initSearch(props.id.value));
        })();
    }, [props.id]);

    React.useEffect(() => {
        (async function () {
            if (searchTerm && searchIndeces) {
                setSearchResultsIds([]);
                await runSearch(
                    searchTerm,
                    searchIndeces,
                    (resultIds: string[]) => {
                        setSearchResultsIds((prevArray: string[]) => [...prevArray, ...resultIds]);
                    }
                );
            }
            else {
                if (searchTerm === "") {
                    setSearchResultsIds([]);
                }
            }
        })();
    }, [searchTerm, searchIndeces]);
    
    React.useEffect(() => {
        if (searchResultsIds) {
            const splitIds = splitArray(searchResultsIds, PAGINATOR);
            const searchReducerList = [];
            for (let i = 0; i < splitIds.length; i++) {
                searchReducerList.push({ [`${SEARCH.cursorPrefix}-${i}`]: splitIds[i] })
            }
            const searchReducerObject = { [props.cursorObject.key]: { [props.cursorObject.value]: searchReducerList } };
        }
    }, [searchResultsIds, props.cursorObject])

    return (
        <Search
            placeholder={searchIndeces ? LANGUAGE.searchArtifacts : `${LANGUAGE.searchInitializing}...`}
            handleSearchFetch={(term: string) => setSearchTerm(term)}
            disabled={!searchIndeces}
        />
    )
}