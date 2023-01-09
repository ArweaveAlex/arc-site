import React from "react";
import { useParams } from "react-router-dom";

import { getArtifactsByAssociation } from "gql/artifacts";

import { ArtifactList } from "./ArtifactList";
import { ArtifactSingle } from "./ArtifactSingle";

import { Loader } from "components/atoms/Loader";

import * as window from "config/window";
import { ArtifactDetailType } from "config/types";

export default function Artifact() {
    const { id } = useParams();

    const [data, setData] = React.useState<ArtifactDetailType | ArtifactDetailType[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (id) {
                window.scrollTo(0, 0);
                setLoading(true);
                await getArtifactsByAssociation(id,
                    (data: ArtifactDetailType[]) => { setData([...data]) })
                setLoading(false);
            }
        })()
    }, [id]);

    function getData() {
        if ((data instanceof Array) && data.length > 1) { // TODO return non-array if no association
            return (
                <ArtifactList 
                    data={data}
                    loading={loading}
                />
            )
        }
        else {
            return <ArtifactSingle data={data[0]} />
        }
    }

    return data ? <>{getData()}</> : <Loader />;
}
