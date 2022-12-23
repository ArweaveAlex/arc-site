import axios from "axios";
import { GQLResponseType } from "types";

import { getGQLData} from '../gql';
import { getLatestPoolSearchIndexTxId, getPoolSearchIndexById } from "gql/pools";
import { getTagValue } from "utils";
import { TAGS } from "config";
import { convertTypeAcquisitionFromJson } from "typescript";

const ID_TERM = "`*";
const OWNER_TERM = "`*";
const BASE_SEARCH_INDEX_URL = "https://arweave.net/";


export async function initSearch(poolId: string) {
    let poolIndeces: string[] = [];
    let latestIndexTransaction = await getLatestPoolSearchIndexTxId(poolId);
    let latestIndexTransactionId = getTagValue(latestIndexTransaction.node.tags, TAGS.keys.uploaderTxId);
    let poolSearchState = (await getPoolSearchIndexById(latestIndexTransactionId)).state;
    if(!poolSearchState || !poolSearchState.searchIndeces) {
        return null;
    }
    poolIndeces = poolSearchState.searchIndeces.map((index: string) => {
        return BASE_SEARCH_INDEX_URL + index;
    });
    return poolIndeces;
}

export async function search(
    searchTerm: string,
    poolIndeces: string[],
    searchCallback: any
) {
    for(let k = 0; k < poolIndeces.length; k++){
        let poolIndex = poolIndeces[k];
        searchIndex(
            searchTerm, 
            poolIndex, 
            searchCallback
        );
    }
}

async function searchIndex(
    searchTerm: string, 
    index: string,
    searchCallback: any
) {
    const searchIndex = (await axios.get(
        index
    )).data;
    
    let text = searchIndex;
    searchTerm = strip(searchTerm);

    let indeces = [
        ...text.matchAll(new RegExp(searchTerm, 'gi'))
    ].map(a => a.index);
    
    let ids: string[] = [];
    for(let i = 0; i< indeces.length; i++){
        let idString = pullId(indeces[i], text);
        ids.push(idString);
    }

    searchCallback(ids);
}

export async function fetchArtifacts(ids: string[], cursor: number) {
    // use number cursor to split up ids
    let artifacts: GQLResponseType[] = await getGQLData({
        ids: ids,
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null
    });

    return artifacts;
}

function pullId(index: number, text: string) {
    for(let j = index; j < text.length; j++) {
        let backTrack = j - (ID_TERM.length - 1);
        let subTerm = text.substring(backTrack, j + 1);
        if(subTerm === ID_TERM){
            for(let k = j + 1; k < text.length; k++) {
                let backTrack2 = k - (ID_TERM.length - 1);
                let subTerm2 = text.substring(backTrack2, k + 1);
                if(subTerm2 === ID_TERM){
                    return text.substring(j + 1, k - 1);
                }
            }
        }
    }
}

function strip(s: any) {
    return s.replaceAll(' ','')
        .replaceAll('\t','')
        .replaceAll('\r','')
        .replaceAll('\n','')
        .replaceAll(ID_TERM,'')
        .replaceAll(OWNER_TERM,'')
        .toLowerCase();
}