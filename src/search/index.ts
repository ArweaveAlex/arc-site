import axios from "axios";

import { 
    getLatestPoolSearchIndexTxId, 
    getPoolSearchIndexById 
} from "gql/pools";
import { getTxEndpoint } from "config/endpoints";
import { getTagValue, stripSearch } from "config/utils";
import { TAGS, SEARCH } from "config";

export async function initSearch(poolIds: string[]) {
    try {
        let poolIndeces: string[] = [];
        let latestIndexTransaction = await getLatestPoolSearchIndexTxId(poolIds[0]); // TODO - Multiple Pools
        let latestIndexTransactionId = getTagValue(latestIndexTransaction.node.tags, TAGS.keys.uploaderTxId);
        let poolSearchState = (await getPoolSearchIndexById(latestIndexTransactionId)).state;
        if(!poolSearchState || !poolSearchState.searchIndeces) {
            return null;
        }
        poolIndeces = poolSearchState.searchIndeces.map((index: string) => {
            return getTxEndpoint(index);
        });
        return poolIndeces;
    }
    catch {
        return null
    }
}

export async function runSearch(
    searchTerm: string,
    poolIndeces: string[] | null,
    searchCallback: any
) {
    if (poolIndeces) {
        for(let k = 0; k < poolIndeces.length; k++){
            let poolIndex = poolIndeces[k];
            searchIndex(
                searchTerm, 
                poolIndex, 
                searchCallback
            );
        }
    }
}

async function searchIndex(
    searchTerm: string, 
    index: string,
    searchCallback: (ids: string[]) => void
) {
    const searchIndex = (await axios.get(
        index
    )).data;
    
    let text = searchIndex;
    searchTerm = stripSearch(searchTerm);

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

function pullId(index: number, text: string) {
    for(let j = index; j < text.length; j++) {
        let backTrack = j - (SEARCH.idTerm.length - 1);
        let subTerm = text.substring(backTrack, j + 1);
        if(subTerm === SEARCH.idTerm){
            for(let k = j + 1; k < text.length; k++) {
                let backTrack2 = k - (SEARCH.idTerm.length - 1);
                let subTerm2 = text.substring(backTrack2, k + 1);
                if(subTerm2 === SEARCH.idTerm){
                    return text.substring(j + 1, k - 1);
                }
            }
        }
    }
}