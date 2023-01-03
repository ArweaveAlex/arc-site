import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/store";
import { ReduxSearchIndexUpdate } from "redux/search/ReduxSearchIndexUpdate";
import { runSearch } from "search";

import { Search } from "components/molecules/Search";

import * as searchActions from "redux/search/actions"
import { splitArray } from "config/utils";
import { PAGINATOR, SEARCH } from "config";
import { IProps } from "./types";
import { REDUX_TABLES } from "config/redux";

export default function ArtifactSearch(props: IProps) {
    const dispatch = useDispatch();
    const searchTermReducer = useSelector((state: RootState) => state.searchTermReducer);
    const searchIndecesReducer = useSelector((state: RootState) => state.searchIndecesReducer);

    const [searchIndeces, setSearchIndeces] = React.useState<string[] | null>(
        props.cursorObject.value && 
        searchIndecesReducer[props.cursorObject.value] &&
        searchIndecesReducer[props.cursorObject.value].id.value === props.id.value ?
        searchIndecesReducer[props.cursorObject.value].value : null
    );
    
    const [searchTerm, setSearchTerm] = React.useState<string>(
        searchTermReducer[REDUX_TABLES.poolAll].id.value === props.id.value ?
        (searchTermReducer[REDUX_TABLES.poolAll].value || "") : "");
    
        const [searchResultIds, setSearchResultIds] = React.useState<string[]>([]);
    const [searchRequested, setSearchRequested] = React.useState<boolean>(false);

    function getSearchIndexIds() {
        return [props.id.value];
    }

    const handleIdUpdate = React.useCallback((searchResultIds: any[], cursorValue: string) => {
        const splitIds = splitArray(searchResultIds, PAGINATOR);
        const searchReducerList = [];
        for (let i = 0; i < splitIds.length; i++) {
            searchReducerList.push({ [`${SEARCH.cursorPrefix}-${i}`]: splitIds[i] })
        }
        const searchReducerObject = { [cursorValue]: searchReducerList };
        dispatch(searchActions.setSearchIds(searchReducerObject));
    }, [dispatch])

    const handleClear = React.useCallback(() => {
        setSearchTerm("");
        setSearchResultIds([]);
        props.setSearchRequested(false);
        dispatch(searchActions.clearSearchIds());
        dispatch(searchActions.clearSearchTerm());
    }, [dispatch, props])

    function handleChange(term: string) {
        dispatch(searchActions.setSearchTerm({
            [REDUX_TABLES.poolAll]: {
                value: term,
                id: props.id
            }
        }));
    }

    function handleSearch(e: any) {
        if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
            setSearchResultIds([]);
            dispatch(searchActions.clearSearchIds());
            setSearchRequested(true);
        }
    }

    React.useEffect(() => {
        if (props.cursorObject.value && 
            searchIndecesReducer[props.cursorObject.value] &&
            searchIndecesReducer[props.cursorObject.value].id.value === props.id.value
            ) {
            setSearchIndeces(searchIndecesReducer[props.cursorObject.value].value);
        }
    }, [searchIndecesReducer, props.cursorObject.value, props.id.value])

    React.useEffect(() => {
        if ((searchTermReducer[REDUX_TABLES.poolAll].value ||
            searchTermReducer[REDUX_TABLES.poolAll].value === "") &&
            searchTermReducer[REDUX_TABLES.poolAll].id.value === props.id.value) {
            setSearchTerm(searchTermReducer[REDUX_TABLES.poolAll].value);
            if (searchTermReducer[REDUX_TABLES.poolAll].value === "") {
                setSearchRequested(false);
                props.setSearchRequested(false);
            }
        }
    }, [searchTermReducer, props])

    React.useEffect(() => {
        if (searchTermReducer[REDUX_TABLES.poolAll].value &&
            searchTermReducer[REDUX_TABLES.poolAll].id.value === props.id.value) {
            setSearchRequested(true);
            setSearchTerm(searchTermReducer[REDUX_TABLES.poolAll].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (searchResultIds && searchResultIds.length > 0) {
            handleIdUpdate(searchResultIds, props.cursorObject.value);
        }
    }, [searchResultIds, props.cursorObject.value, handleIdUpdate])

    React.useEffect(() => {
        (async function () {
            if (searchRequested && searchTerm && searchIndeces && searchResultIds.length <= 0) {
                props.setSearchRequested(searchRequested);
                await runSearch(
                    searchTerm,
                    searchIndeces,
                    (resultIds: string[]) => {
                        setSearchResultIds((prevArray: string[]) => [...prevArray, ...resultIds]);
                    }
                );
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequested, searchIndeces, searchResultIds.length, props]);

    return (
        <ReduxSearchIndexUpdate id={props.id} indexIds={getSearchIndexIds()} reduxCursor={REDUX_TABLES.poolAll}>
            <Search
                value={searchTerm}
                handleChange={(term: string) => handleChange(term)}
                handleSearch={(e: React.KeyboardEvent<HTMLInputElement>) => handleSearch(e)}
                handleClear={handleClear}
                disabled={!searchIndeces || props.disabled}
            />
        </ReduxSearchIndexUpdate>
    )
}