import { CURRENT_WHITELISTED_POOLS } from "./../../../src/utils/PoolExtraData";
/* tslint:disable */
import type { NextApiRequest, NextApiResponse } from "next";


export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.send(CURRENT_WHITELISTED_POOLS);
};
