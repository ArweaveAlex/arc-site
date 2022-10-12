import dbConnect from "@/lib";
import PoolModel from "@/models";
import { GetServerSideProps } from "next";

import { _Collection } from "@/views/Collection";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  await dbConnect();

  const CHAR_NUM_MATCH = 41;

  // @ts-ignore
  const collectionData = await PoolModel.findOne({
    id: {
      $regex: slug?.slice(-CHAR_NUM_MATCH),
      $options: "i",
    },
  })
    .select(["-_id"])
    .lean()
    .exec();

  return {
    props: {
      data: JSON.parse(JSON.stringify(collectionData)),
    },
  };
};

export default function Collection({ data }) {
  return <_Collection data={data}/>
}
