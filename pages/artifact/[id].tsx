import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Loader } from "@/components/atoms/Loader";

import { useRouter } from "next/router";

import { _Artifact } from "@/views/Artifact";

import { ID_LENGTH } from "@/config";

export default function Artifact() {
  const router = useRouter()
  const arProvider = useARProvder();

  const [artifact, setArtifact] = React.useState<any>(null);

  React.useEffect(() => {
    (async function () {
      if (router.query.id) {
        setArtifact(await arProvider.getArtifactById(router.query.id?.slice(-ID_LENGTH) as string));
      }
    })()
  }, [router.query.id]);

  return artifact ? (
    <_Artifact data={artifact}/>
  ) : <Loader />
}
