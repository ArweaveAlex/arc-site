import { ArtifactDetailType } from "config/types";

export function orderByAssociationSequence(data: ArtifactDetailType[]) {
    const sortedData: ArtifactDetailType[] = data.sort(function (a, b) {
        return Number(a.associationSequence) - Number(b.associationSequence);
    })
    return sortedData;
}
