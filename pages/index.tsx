import PoolModel from "@/models/pool";
import dbConnect from "@/utils/DbConnect";
import { CURRENT_WHITELISTED_POOLS } from "@/utils/PoolExtraData";

import { Landing } from "@/views/Landing";
 
import { MOCK_DATA_HEADER } from "@/mock-data";

export async function getServerSideProps() {
  await dbConnect();


  const allCollections = await PoolModel.find({
    id: CURRENT_WHITELISTED_POOLS
  }).select(["-_id", "-ts"]).lean().exec();

  return {
    props: {
      data: allCollections,
    },
  };
}

export default function LandingIndex({ data }) {
  return <Landing data={MOCK_DATA_HEADER}/>;
}