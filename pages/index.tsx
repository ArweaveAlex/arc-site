import PoolModel from "@/models/pool";
import dbConnect from "@/utils/DbConnect";
import { CURRENT_WHITELISTED_POOLS } from "@/utils/PoolExtraData";

import { Landing } from "@/views/Landing";

 import { MOCK_DATA } from "@/mock-data";

export async function getServerSideProps() {
  await dbConnect();


  const allPools = await PoolModel.find({
    id: CURRENT_WHITELISTED_POOLS
  }).select(["-_id", "-ts"]).lean().exec();

  return {
    props: {
      data: allPools,
    },
  };
}

export default function Index({ data }) {
  return <Landing data={MOCK_DATA}/>;
}