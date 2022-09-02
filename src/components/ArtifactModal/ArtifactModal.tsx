import { ArtefactsResponseProps } from "@/templates/Account/Account";
import Portal from "@/utils/Portal";
import { ArtefactTypeEnum } from "../types/ArtefactType";

interface ArtifactModalProps {
  isOpen: boolean;
  // TODO: CHANGE THIS ANY
  data: any;
  onClose: (e: any) => void;
  artefact: ArtefactsResponseProps
}

const ArtifactModal = ({
  artefact,
  isOpen,
  onClose,
  data,
}: ArtifactModalProps) => {

  const CURRENT_ARTIFACT_TYPE = data?.type;

  if (!isOpen) return <div />;

  return (
    // @ts-ignore
    <Portal>
      <div
        className="fixed top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-40"
        onClick={onClose}
      >
        <div className="z-30 flex w-[588px] flex-col gap-6 rounded-3xl bg-gradient-to-b from-[#3B3124] to-[#635544] py-8 px-10 text-white shadow-md">
          <div className="">
            <p className="bg-gradient-to-r from-[#F7CA4A] to-[#F09140] bg-clip-text font-league-gothic text-3xl uppercase text-transparent">
              Artefact visualizer
            </p>
            <p className="">{artefact.contract}</p>
          </div>

          {!data?.data && !data?.error && (
            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                ></circle>
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  className="opacity-75"
                ></path>
              </svg>
              <p>Fetching artefact from Blockchain...</p>
            </div>
          )}

          {data?.error && (
            <div className="flex gap-4 text-red-400">
              {data?.error}
              </div>
          )}

          {CURRENT_ARTIFACT_TYPE === ArtefactTypeEnum.HTML && data?.data && (
            <iframe
              src={`https://arweave.net/${data.data.media[0]}`}
              className="h-96 w-full"
            />
          )}

          {/* {CURRENT_ARTIFACT_TYPE === ArtefactTypeEnum.IMAGE && (
            <img
              src={`https://arweave.net/${txHash}`}
              className="h-96 w-full"
            />
          )}

          {CURRENT_ARTIFACT_TYPE === ArtefactTypeEnum.VIDEO && (
            <video className="w-full" autoPlay controls>
              <source
                src={`https://arweave.net/${txHash}`}
                type="video/mp4"
              ></source>
            </video>
          )} */}

          {CURRENT_ARTIFACT_TYPE === ArtefactTypeEnum.TWEET && data?.data && (
            <div className="rounded-md border border-gray-100/30 p-4 overflow-scroll h-72">
              <div className="flex gap-4 ">
                <img
                  src={data?.data?.avatar}
                  alt="User twitter profile picture"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold"> {data?.data?.user}</p>
                  <p>{data?.data?.username}</p>
                </div>
              </div>
              <p className="mt-4 text-2xl">{data?.data?.text}</p>
              {data?.data?.media.length && (
                <img src={`https://arweave.net/${data?.data?.media[0]}`} className="w-full mt-4" />
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default ArtifactModal;
