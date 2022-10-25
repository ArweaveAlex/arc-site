import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Loader } from "@/components/atoms/Loader";

import { useRouter } from "next/router";

import { _Collection } from "@/views/Collection";

import { ID_LENGTH } from "@/config";

export default function Collection() {
  const router = useRouter()
  const arProvider = useARProvder();

  const [collection, setCollection] = React.useState<any>(null);

  React.useEffect(() => {
    (async function () {
      if (router.query.id) {
        setCollection(await arProvider.getPoolById(router.query.id?.slice(-ID_LENGTH) as string));
      }
    })()
  }, [router.query.id])

  return collection ? (
    <_Collection data={collection}/>
  ) : <Loader />
}
