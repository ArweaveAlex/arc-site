import PoolModel from "@/models";
import dbConnect from "@/lib";

import { Landing } from "@/views/Landing";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  await dbConnect();

  // @ts-ignore
  const allCollections = await PoolModel.find({}).select(["-_id"]).lean().exec();

  return {
    props: {
      data: JSON.parse(JSON.stringify(allCollections)),
    },
  };
}

export default function LandingIndex() {
  const [data, setData] = useState(null);

  useEffect(() => {
    
  });

  return data ? (<Landing data={data}/>) : <div></div>;
}