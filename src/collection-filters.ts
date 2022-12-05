import { CollectionType } from "types";

export function sortByMostContributed(collections: CollectionType[], amount: number | null): CollectionType[] {
    const sortedCollections: any = collections.sort(function (a, b) {
        return parseFloat(a.state.totalContributions) - parseFloat(b.state.totalContributions)
    }).reverse();
    if (amount) {
        return sortedCollections.length <= amount ? sortedCollections : sortedCollections.slice(0, amount);
    }
    else {
        return sortedCollections;
    }
}