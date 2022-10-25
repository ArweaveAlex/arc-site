import React from "react";

import { ArtifactType, ArtifactEnum } from "@/types"

function WikiArtifact(props: { data: ArtifactType }) {
    return (
        <iframe src={props.data.dataUrl} style={{
            position: "absolute",
            height: "50%",
            width: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid red",
            overflow: "hidden"
        }}></iframe>
    )
}

function TweetArtifact(props: { data: ArtifactType }) {
    return (
        <div style={{
            position: "absolute",
            height: "50%",
            width: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid red",
            overflow: "hidden"
        }}>
            <p>{props.data.rawData}</p>
        </div>
    );
}

export default function _Artifact(props: { data: ArtifactType }) {

    function getArtifact() {
        if (props.data) {
            switch (props.data.artifactType) {
                case ArtifactEnum.Tweet:
                    return <TweetArtifact data={props.data} />
                case ArtifactEnum.Wiki:
                    return <TweetArtifact data={props.data} />
                default:
                    try {
                        JSON.parse(props.data.rawData);
                        return <TweetArtifact data={props.data} />
                    }
                    catch (e) {
                        return <WikiArtifact data={props.data} />
                    }
            }
        }
        else {
            return null;
        }
    }

    return (
        <>{getArtifact()}</>
    );
}