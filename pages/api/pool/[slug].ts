
/* tslint:disable */
import dbConnect from "@/utils/DbConnect";
import PoolModel from "@/models/pool";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  // get pool data
  await dbConnect();

  const NUMBER_OF_CHARACTERS_TO_MATCH_QUERY = 41;

  const poolData = await PoolModel.findOne({
    id: {
      $regex: slug?.slice(-NUMBER_OF_CHARACTERS_TO_MATCH_QUERY),
      $options: "i",
    },
  })
    .select(["-_id", "-ts"])
    .lean()
    .exec();

    if(!poolData) {
      res.status(404)
      return;
    }

  // convert to arfunds
  res.send(poolData)
};
