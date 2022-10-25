import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Loader } from "@/components/atoms/Loader";

import { Landing } from "@/views/Landing";

export default function LandingIndex() {
  const arProvider = useARProvder();

  const [collections, setCollections] = React.useState<any>(null);

  React.useEffect(() => {
    (async function () {
      setCollections(await arProvider.getAllPools());
    })()
  }, [])

  return collections ? (
    <Landing data={collections} />
  ) : <Loader />;
}