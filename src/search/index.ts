

import axios from "axios";

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

export async function searchTerm(poolId: string, searchTerm: string) {
    let results: SearchResult[] = [];

    
    

    const searchIndex = (await axios.get(
        'https://a3uhfh2vqnkier2z4yf2fcdbjvml7obqx64zblay25mzkze53flq.arweave.net/Buhyn1WDVIJHWeYLoohhTVi_uDC_uZCsGNdZlWSd2Vc'
    )).data;

    var t = timer('Search benchmark');
    
    // find length of search term
    // loop through array of chars
    // reach length of search term start checking back to term length
    // find match loop from end index until find an int push that int into results
    let text = searchIndex;
    searchTerm = searchTerm.toLowerCase();

    let indeces = [
        ...text.matchAll(new RegExp(searchTerm, 'gi'))
    ].map(a => a.index);

    console.log(indeces);
    
    let ids: string[] = [];
    for(let i = 0; i< indeces.length; i++){
        let idString = pullId(indeces[i], text);
        ids.push(idString);
    }

    console.log(ids);

    t.stop();

    return results;
}

function pullId(index: number, text: string) {
    for(let j = index; j < text.length; j++) {
        let backTrack = j - (ID_TERM.length - 1);
        let subTerm = text.substring(backTrack, j + 1);
        if(subTerm === ID_TERM){
            console.log(subTerm);

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