import { ArtifactDetailType } from 'arcframework';

export function sortByAssociationSequence(data: ArtifactDetailType[]) {
	const sortedData: ArtifactDetailType[] = data.sort(function (a, b) {
		return a && b ? Number(a.associationSequence) - Number(b.associationSequence) : 1;
	});
	return sortedData;
}
