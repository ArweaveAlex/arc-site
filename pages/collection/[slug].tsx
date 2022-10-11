import dbConnect from "@/lib";
import PoolModel from "@/models";
import { GetServerSideProps } from "next";

import { _Collection } from "@/views/Collection";

import { MOCK_DATA_HEADER } from "@/mock-data";

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
    .select(["-_id", "-ts"])
    .lean()
    .exec();

  return {
    props: {
      data: collectionData,
    },
  };
};

export default function Collection({ data }) {
  console.log(data);
  return <_Collection data={MOCK_DATA_HEADER[1]!}/>
}
