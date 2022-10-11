import { TwitterResponseProps } from "@/components/ArtifactModal/ArtifactModal.types";
import { ContractDataResponseProps } from "@/components/types/ContractDataResponseProps";
import type { NextApiRequest, NextApiResponse } from "next";
import GraphQlClient from "@/lib/graphql/client";
import { gql } from "@apollo/client";
import { ContractInfoResponseProps } from "@/components/types/ContractInfoResposeProps";
import { ArtefactBundlrProps } from "@/components/types/ArtefactBundlrProps";
import { ArtefactTypeEnum } from "@/components/types/ArtefactType";

const GET_ARTEFACT_EXTRA_INFO_QUERY = gql`
  query ($id: ID!) {
    transaction(id: $id) {
      id
      owner {
        address
      }
      tags {
        name
        value
      }
    }
  }
`;

// @ts-ignore
const GET = async (...props: any) => fetch(...props).then((res) => res.json());

const WHITELISTED_OWNERS = [
  "7smNXWVNbTinRPuKbrke0XR0N9N6FgTBVCh20niXEbU",
  "93mQRQG7zpvKQj3sUaDlNu_dOWFmb3-vp2Myu8sw03I",
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { contract } = req.query;

    const contractInfo: ContractInfoResponseProps = await GET(
      `https://gateway.redstone.finance/gateway/contract?txId=${contract}`
    );

    if (!WHITELISTED_OWNERS.includes(contractInfo.owner)) {
      return res.status(403).json({
        error: "This artefact doesn't have a whitelisted owner.",
      });
    }

    const bundlerIndexedInfo: ArtefactBundlrProps = await GraphQlClient.query({
      query: GET_ARTEFACT_EXTRA_INFO_QUERY,
      variables: {
        id: contractInfo.bundlerTxId,
      },
    });

    const artefactType = bundlerIndexedInfo.data.transaction.tags.find(
      (obj) => obj.name === "Application"
    );

    if (!artefactType || !artefactType.value) {
      return res.status(404).json({
        error: "No artefact type or value found",
      });
    }

    const contentType = bundlerIndexedInfo.data.transaction.tags.find(
      (obj) => obj.name === "Content-Type"
    );

    if (!contentType || !contentType.value) {
      return res.status(404).json({
        error: "No content type or value found",
      });
    }

    const ALLOWED_CONTENT_TYPES = [
      "application/json",
      "application/x.arweave-manifest+json",
      "text/plain",
    ];

    if (ALLOWED_CONTENT_TYPES.indexOf(contentType.value) === -1) {
      return res.status(404).json({
        error:
          "Content type is not application/x.arweave-manifest+json or application/json",
      });
    }

    let contractType;
    switch (artefactType?.value) {
      case "ARticle":
        contractType = ArtefactTypeEnum.HTML;
        break;
      case "TwittAR":
        contractType = ArtefactTypeEnum.TWEET;
        break;
      default:
        return res.status(404).json({
          error: "Unknown artefact type",
        });
    }

    const artefactData: ContractDataResponseProps = await GET(
      `https://gateway.redstone.finance/gateway/contract-data/${contract}`
    );

    let jsonContent: {
      data: {
        [key: string]: any;
      };
    } = { data: { media: [] } };

    for (let file of Object.keys(artefactData.paths)) {
      const { id } = artefactData?.paths[file] || {};

      if (!id) {
        continue;
      }

      if (file.includes(".html")) {
        jsonContent.data.media.push(id);
      }

      if (file.includes("json")) {
        const tweetRaw = await fetch(`https://arweave.net/${id}`);

        const jsonRaw: TwitterResponseProps = await tweetRaw.json();

        jsonContent.data = {
          ...jsonContent.data,
          user: jsonRaw.user.name,
          username: jsonRaw.user.screen_name,
          text: jsonRaw.text,
          avatar: jsonRaw.user.profile_image_url_https,
        };
      }

      if (file.includes("media/")) {
        jsonContent.data.media.push(id);
      }
    }

    return res.send({ ok: true, type: contractType, ...jsonContent });
  } catch (error) {
    return res.status(500).json({
      error: "The data of the requested artefact could not be loaded.",
    });
  }
};
