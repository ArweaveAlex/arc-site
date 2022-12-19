

import axios from "axios";
import { GQLResponseType } from "types";

import { getGQLData } from '../gql';

let ID_TERM = "`*"

export type SearchResult = {
    id: string;
    description: string;
}

var timer = function(name: any) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};

let results: SearchResult[] = [];

export async function searchTerm(poolId: string, searchTerm: string) {

    var t = timer('Search benchmark');

    let poolIndeces = [
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc',
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc',
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc',
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc',
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc',
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc'
    ];

    results = [];

    for(let k = 0; k < poolIndeces.length; k++){
        let poolIndex = poolIndeces[k];
        searchIndex(
            searchTerm, 
            poolIndex, 
            k, 
            t
        );
    }

    t.stop();
}

async function searchIndex(
    searchTerm: string, 
    index: string,
    i: number,
    t: any
) {
    const searchIndex = (await axios.get(
        index
    )).data;
    
    let text = searchIndex;
    searchTerm = searchTerm.toLowerCase();

    let indeces = [
        ...text.matchAll(new RegExp(searchTerm, 'gi'))
    ].map(a => a.index);
    
    let ids: string[] = [];
    for(let i = 0; i< indeces.length; i++){
        let idString = pullId(indeces[i], text);
        ids.push(idString);
    }

    console.log(ids);

    let artifacts: GQLResponseType[] = await getGQLData({
        ids: ids,
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null
    });

    console.log(artifacts);

    if(i == 5) {
        t.stop();
    }

    // results.push(artifacts);
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