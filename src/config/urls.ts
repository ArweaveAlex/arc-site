export const base = "/";
export const account = `${base}account/`;
export const accountAll = `${account}all/`;
export const accountNew = `${account}new/`;
export const accountCollections = `${account}collections/`;
export const accountContributions = `${account}contributions/`;
export const artifact = `${base}artifact/`;
export const pool = `${base}pool/`;
export const pools = `${base}pools/`;
export const library = `${base}library/`;
export const libraryAll = (id: string) => `${library}${id}/all/`;
export const libraryCollections = (id: string) => `${library}${id}/collections/`;