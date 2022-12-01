import { CollectionType } from "types";

export function sortByMostContributed(collections: CollectionType[]): CollectionType[] {
    const sortedCollections: any = collections.sort(function (a, b) {
        return parseFloat(a.state.totalContributions) - parseFloat(b.state.totalContributions)
    }).reverse();
    return sortedCollections.length <= 5 ? sortedCollections : sortedCollections.slice(0, 5);
}