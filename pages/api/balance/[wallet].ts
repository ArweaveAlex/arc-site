/* tslint:disable */
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { wallet } = req.query;

  const WINSTON_CONSTANT = 1e12;

  const raw = await fetch(`https://arweave.net/wallet/${wallet}/balance`)

  const balance = await raw.json()

  // convert to arfunds
  res.send({ balance: balance / WINSTON_CONSTANT });
};
