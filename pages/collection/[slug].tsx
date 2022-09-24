import dbConnect from "@/lib";
import PoolModel from "@/models";
import { GetServerSideProps } from "next";

import { _Collection } from "@/views/Collection";

import { MOCK_DATA_HEADER } from "@/mock-data";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  await dbConnect();

  const NUMBER_OF_CHARACTERS_TO_MATCH_QUERY = 41;

  const collectionData = await PoolModel.findOne({
    id: {
      $regex: slug?.slice(-NUMBER_OF_CHARACTERS_TO_MATCH_QUERY),
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
  return <_Collection data={MOCK_DATA_HEADER[1]!}/>
}
