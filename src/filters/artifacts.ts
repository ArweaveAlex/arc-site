import { ArtifactDetailType } from "config/types";

export function sortByAssociationSequence(data: ArtifactDetailType[]) {
    const sortedData: ArtifactDetailType[] = data.sort(function (a, b) {
        return (a && b) ? Number(a.associationSequence) - Number(b.associationSequence) : 1;
    })
    return sortedData;
}
