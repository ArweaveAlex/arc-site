import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "state/store";
import { ReduxSearchIndexUpdate } from "state/search/ReduxSearchIndexUpdate";
import { runSearch } from "search";

import { Search } from "components/molecules/Search";

import * as searchActions from "state/search/actions";
import * as cursorActions from "state/cursors/actions";
import { splitArray } from "helpers/utils";
import { PAGINATOR, SEARCH } from "helpers/config";
import { IProps } from "./types";

export default function ArtifactsSearch(props: IProps) {
  const dispatch = useDispatch();
  const searchTermReducer = useSelector(
    (state: RootState) => state.searchTermReducer
  );
  const searchIndecesReducer = useSelector(
    (state: RootState) => state.searchIndecesReducer
  );

  const [searchIndeces, setSearchIndeces] = React.useState<string[] | null>(
    props.cursorObject.value &&
      searchIndecesReducer[props.cursorObject.value] &&
      searchIndecesReducer[props.cursorObject.value].id.value === props.id.value
      ? searchIndecesReducer[props.cursorObject.value].value
      : null
  );

  const [searchTerm, setSearchTerm] = React.useState<string>(
    searchTermReducer[props.cursorObject.value].id.value === props.id.value
      ? searchTermReducer[props.cursorObject.value].value || ""
      : ""
  );

  const [searchResultIds, setSearchResultIds] = React.useState<string[]>([]);
  const [searchRequested, setSearchRequested] = React.useState<boolean>(false);
  const [searchToggle, setSearchToggle] = React.useState<boolean>(false);

  const handleIdUpdate = React.useCallback(
    (searchResultIds: any[], cursorValue: string) => {
      const splitIds = splitArray(searchResultIds, PAGINATOR);
      const searchReducerList = [];
      for (let i = 0; i < splitIds.length; i++) {
        searchReducerList.push({
          [`${SEARCH.cursorPrefix}-${i}`]: splitIds[i],
        });
      }
      const searchReducerObject = { [cursorValue]: searchReducerList };
      dispatch(searchActions.setSearchIds(searchReducerObject));
    },
    [dispatch]
  );

  const handleClear = React.useCallback(() => {
    setSearchTerm("");
    setSearchResultIds([]);
    props.setSearchRequested(null);
    dispatch(searchActions.clearSearchIds());
    dispatch(searchActions.clearSearchTerm());
  }, [dispatch, props]);

  function handleChange(term: string) {
    dispatch(
      searchActions.setSearchTerm({
        [props.cursorObject.value]: {
          value: term,
          id: props.id,
        },
      })
    );
  }

  function handleSearch(e: any) {
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
      setSearchResultIds([]);
      dispatch(searchActions.clearSearchIds());
      dispatch(cursorActions.clearCursors());
      setSearchRequested(true);
      setSearchToggle(!searchToggle);
    }
  }

  React.useEffect(() => {
    if (
      props.cursorObject.value &&
      searchIndecesReducer[props.cursorObject.value] &&
      searchIndecesReducer[props.cursorObject.value].id.value === props.id.value
    ) {
      setSearchIndeces(searchIndecesReducer[props.cursorObject.value].value);
    }
  }, [searchIndecesReducer, props.cursorObject.value, props.id.value]);

  React.useEffect(() => {
    if (
      (searchTermReducer[props.cursorObject.value].value ||
        searchTermReducer[props.cursorObject.value].value === "") &&
      searchTermReducer[props.cursorObject.value].id.value === props.id.value
    ) {
      setSearchTerm(searchTermReducer[props.cursorObject.value].value);
      if (searchTermReducer[props.cursorObject.value].value === "") {
        setSearchRequested(null);
        props.setSearchRequested(null);
      }
    }
  }, [searchTermReducer, props]);

  React.useEffect(() => {
    if (
      searchTermReducer[props.cursorObject.value].value &&
      searchTermReducer[props.cursorObject.value].id.value === props.id.value
    ) {
      setSearchRequested(true);
      setSearchTerm(searchTermReducer[props.cursorObject.value].value);
      setSearchToggle(!searchToggle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (searchResultIds && searchResultIds.length > 0) {
      handleIdUpdate(searchResultIds, props.cursorObject.value);
    }
  }, [searchResultIds, props.cursorObject.value, handleIdUpdate]);

  React.useEffect(() => {
    (async function () {
      if (
        searchRequested &&
        searchTerm &&
        searchIndeces &&
        searchResultIds.length <= 0
      ) {
        await runSearch(
          searchTerm,
          searchIndeces,
          props.owner,
          (resultIds: string[], allIndecesProcessed: boolean) => {
            props.setSearchRequested(allIndecesProcessed);
            setSearchResultIds((prevArray: string[]) => [
              ...prevArray,
              ...resultIds,
            ]);
          }
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchToggle]);

  return (
    <ReduxSearchIndexUpdate
      id={props.id}
      indexIds={props.indexIds}
      reduxCursor={props.cursorObject.value}
    >
      <Search
        value={searchTerm}
        handleChange={(term: string) => handleChange(term)}
        handleSearch={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleSearch(e)
        }
        handleClear={handleClear}
        disabled={
          !searchIndeces ||
          (searchIndeces && searchIndeces.length <= 0) ||
          props.disabled
        }
        loading={!searchIndeces}
      />
    </ReduxSearchIndexUpdate>
  );
}
