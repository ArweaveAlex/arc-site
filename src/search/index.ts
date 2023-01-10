import axios from "axios";

import { 
    getLatestPoolSearchIndexTxId, 
    getPoolSearchIndexById 
} from "gql/pools";
import { getTxEndpoint } from "config/endpoints";
import { getTagValue, stripSearch } from "config/utils";
import { TAGS, SEARCH } from "config";

let processedIndeces = 0;
let poolIndecesLength = 0;

export async function initSearch(poolIds: string[]) {
        try{
            let poolIndeces: string[] = [];

            for(let i = 0; i < poolIds.length; i++) {
                let latestIndexTransaction = await getLatestPoolSearchIndexTxId(poolIds[i]);
                if(!latestIndexTransaction) continue;
                let latestIndexTransactionId = getTagValue(latestIndexTransaction.node.tags, TAGS.keys.uploaderTxId);
                let poolSearchState = (await getPoolSearchIndexById(latestIndexTransactionId)).state;
                if(!poolSearchState || !poolSearchState.searchIndeces) {
                    continue;
                }
                let thisPoolIndeces = poolSearchState.searchIndeces.map((index: string) => {
                    return getTxEndpoint(index);
                });
                poolIndeces = poolIndeces.concat(thisPoolIndeces);
            }
            
            return poolIndeces;
        } catch(e: any) {
            console.log(e);
            return null;
        }
    
}

export async function runSearch(
    searchTerm: string,
    poolIndeces: string[] | null,
    owner: string | null,
    callback: (ids: string[], checkProcessed: any) => void
) {
    processedIndeces = 0;
    poolIndecesLength = poolIndeces.length;
    if (poolIndeces) {
        for(let k = 0; k < poolIndeces.length; k++){
            let poolIndex = poolIndeces[k];
            searchIndex(
                searchTerm, 
                poolIndex, 
                owner,
                callback
            );
        }
    }
}

async function searchIndex(
    searchTerm: string, 
    index: string,
    owner: string | null,
    callback: (ids: string[], checkProcessed: any) => void
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
        let idString = pullId(indeces[i], text, SEARCH.idTerm);
        if(owner) {
            let ownerIdString = pullId(indeces[i], text, SEARCH.ownerTerm);
            if(ownerIdString === owner) {
                ids.push(idString);
            }
        } else {
            ids.push(idString);
        }
    }
    
    processedIndeces++;

    callback(ids, allIndecesProcessed());
}

function allIndecesProcessed(){
    if(processedIndeces == poolIndecesLength) return true;
    return false;
}

function pullId(index: number, text: string, splitTerm: string) {
    for(let j = index; j < text.length; j++) {
        let backTrack = j - (splitTerm.length - 1);
        let subTerm = text.substring(backTrack, j + 1);
        if(subTerm === splitTerm){
            for(let k = j + 1; k < text.length; k++) {
                let backTrack2 = k - (splitTerm.length - 1);
                let subTerm2 = text.substring(backTrack2, k + 1);
                if(subTerm2 === splitTerm){
                    return text.substring(j + 1, k - 1);
                }
            }
        }
    }
}