import React from "react";

import { ArtifactViewList } from "./ArtifactViewList";

import { Loader } from "components/atoms/Loader";

import { ArtifactDetailType } from "config/types";
import { IProps } from "./types";

export default function ArtifactList(props: IProps) {
    const [data, setData] = React.useState<ArtifactDetailType[] | null>(null);

    React.useEffect(() => {
        if (props.data) {
            setData(props.data);
        }
    }, [props.data]);

    function getData() {
        if (data) {
            return (
                <ArtifactViewList 
                    data={data}
                    loading={props.loading}
                />
            )
        }
        else {
            return null;
        }
    }

    return data ? <>{getData()}</> : <Loader />;
}