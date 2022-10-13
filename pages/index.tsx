import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Loader } from "@/components/atoms/Loader";

import { Landing } from "@/views/Landing";

export default function LandingIndex() {
  const arProvider = useARProvder();

  const [blockweavePools, setBlockweavePools] = React.useState<any>(null);

  React.useEffect(() => {
    (async function () {
      setBlockweavePools(await arProvider.getAllPools());
    })()
  }, [])

  return blockweavePools ? (
    <Landing data={blockweavePools} />
  ) : <Loader />;
}