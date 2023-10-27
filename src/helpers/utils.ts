export function formatArtifactType(artifactType: string) {
	const result = artifactType.includes('Alex') ? artifactType.substring(5) : artifactType;
	return result.replace(/-/g, ' ');
}
