import * as ArcFramework from 'arcframework';

export async function getArtifactsByPool(args: ArcFramework.ArtifactArgsType): Promise<ArcFramework.ArtifactResponseType> {
    const artifactsResponse = ArcFramework.getArtifactsByPool(args);
    
    // let cursorState: any;
	// if (args.reduxCursor) {
	// 	cursorState = store.getState().cursorsReducer[args.cursorObject][args.reduxCursor];
	// }

	// let nextCursor: string | null = cursorState ? cursorState.next : null;
	// let previousCursor: string | null = cursorState ? cursorState.previous : null;

	// console.log('!');
	// console.log(cursorObject);
	// console.log(reduxCursor);

    return artifactsResponse;
}