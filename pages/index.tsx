import PoolModel from "@/models";
import dbConnect from "@/lib";

import { Landing } from "@/views/Landing";

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

export default function LandingIndex({ data }) {
  return <Landing data={data}/>;
}

/**
 * import { useEffect, useState } from "react";

import { Landing } from "@/views/Landing";
import { LANGUAGE } from "@/language";
import { useARProvder } from "@/providers/ARProvider";

export default function LandingIndex() {
  const [data, setData] = useState<any>(null);
  const arProvider = useARProvder();

  useEffect(() => {
      (async function () {
          setData((await arProvider.getAllPools()));
      })();
  }, [])

  return data ? (<Landing data={data}/>) : <p>{LANGUAGE.loading}&nbsp;...</p>;
}
 */