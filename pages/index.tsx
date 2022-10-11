import PoolModel from "@/models";
import dbConnect from "@/lib";

import { Landing } from "@/views/Landing";
 
import { MOCK_DATA_HEADER } from "@/mock-data";

export async function getServerSideProps() {
  await dbConnect();

  // @ts-ignore
  const allCollections = await PoolModel.find({}).select(["-_id", "-ts"]).lean().exec();

  return {
    props: {
      data: allCollections,
    },
  };
}

export default function LandingIndex({ data }) {
  console.log(data);
  return <Landing data={MOCK_DATA_HEADER}/>;
}