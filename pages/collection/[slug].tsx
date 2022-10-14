import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Loader } from "@/components/atoms/Loader";

import { useRouter } from "next/router";

import { _Collection } from "@/views/Collection";

import { ID_LENGTH } from "@/config";

export default function Collection() {
  const router = useRouter()
  const arProvider = useARProvder();

  const [blockweavePool, setBlockweavePool] = React.useState<any>(null);

  React.useEffect(() => {
    (async function () {
      if (router.query.slug) {
        setBlockweavePool(await arProvider.getPoolById(router.query.slug?.slice(-ID_LENGTH) as string));
      }
    })()
  }, [router.query.slug])

  return blockweavePool ? (
    <_Collection data={blockweavePool}/>
  ) : <Loader />
}
