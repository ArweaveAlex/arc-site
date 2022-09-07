import {
  AnimationWrapper,
  Artifact,
  ArtifactModal,
  Footer,
  Navbar,
  ScrollSection,
} from "@/components/BACKUP";
import { ArtefactTypeEnum } from "@/components/types/ArtefactType";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
export interface ArtefactsResponseProps {
  contract: string;
  ticker: string;
  name: string;
  balance: number;
}

const useAccount = () => {
  const [artefacts, setArtefacts] = useState<ArtefactsResponseProps[] | []>([]);

  const [wallet, setWallet] = useState("");

  const [currentSlice, setCurrentSlice] = useState(12);

  const handleLoadMore = () => {
    setCurrentSlice((prev) => {
      if (prev + 6 > artefacts.length) {
        return artefacts.length;
      }
      return prev + 6;
    });
  };

  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  const [currentArtefact, setCurrentArtefact] =
    useState<ArtefactsResponseProps | null>(null);

  const [currentArtefactData, setCurrentArtefactData] = useState<any>(null);

  useEffect(() => {

    const fetchData = async (userWallet: string) => {
      const raw = await fetch(
        `https://gateway.redstone.finance/gateway/nft/owner/${userWallet}?srcTxId=${NFT_CONTRACT_SRC_TX}`
      );

      const data: ArtefactsResponseProps[] = await raw.json();
      
      console.log("🚀 ~ file: Account.tsx ~ line 103 ~ fetchData ~ data", data)

      setArtefacts(data);
    };

    const handleWallet = async () => {
      await global.window?.arweaveWallet?.connect([
        "ACCESS_ADDRESS",
        "ACCESS_ALL_ADDRESSES",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
      ]);

      const userWallet = await global.window?.arweaveWallet?.getActiveAddress();

      console.log("🚀 ~ file: Account.tsx ~ line 54 ~ handleWal ~ userWallet", userWallet)

      setWallet(userWallet);

      fetchData(userWallet);

    };

    handleWallet();

    // add event listener
    window.addEventListener("arweaveWalletLoaded", handleWallet);

    return () => {
      // remove event listener
      window.removeEventListener("arweaveWalletLoaded", handleWallet);
    };
  }, []);

  // TODO: ADD Artifact Cache on frontend

  const NFT_CONTRACT_SRC_TX = "Qa7IR-xvPkBtcYUBZXd8z-Tu611VeJH33uEA5XiFUNA";

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisualizerOpen(false);
      setCurrentArtefactData(null);
    }
  };

  const handleCurrentArtefact = async (artefact) => {
    setCurrentArtefactData(null);

    setCurrentArtefact(artefact);

    setIsVisualizerOpen(true);

    const response = await fetch(`/api/artefact/${artefact.contract}`);

    const data = await response.json();

    setCurrentArtefactData(data);
  };

  return {
    artefacts,
    currentArtefact,
    currentArtefactData,
    currentSlice,
    handleCurrentArtefact,
    handleLoadMore,
    handleModalClose,
    isVisualizerOpen,
    wallet,
  };
};

const Account = () => {
  const {
    artefacts,
    currentArtefact,
    currentArtefactData,
    currentSlice,
    handleLoadMore,
    handleModalClose,
    isVisualizerOpen,
    wallet,
  } = useAccount();

  return (
    <div>
      <NextSeo title={`Account | Heroes of History`} description={""} />
      <Navbar />
      <ArtifactModal
        artefact={currentArtefact as ArtefactsResponseProps}
        isOpen={isVisualizerOpen}
        onClose={handleModalClose}
        data={currentArtefactData}
      />
      <AnimationWrapper>
        {!wallet && (
          <div className="container mx-auto mt-24 mb-40 px-8">
            <h1 className="pb-4 font-league-gothic text-5xl uppercase">
              Verify your wallet.
            </h1>
            <h2>Please, verify your wallet connection and try again.</h2>
          </div>
        )}
        {wallet && (
          <div className="container mx-auto mt-24 mb-40 px-8">
            <h1 className="pb-4 font-league-gothic text-5xl uppercase">
              All my artefacts
            </h1>
            <p className="leading-10">
              Bellow is listed all artefacts of your wallet.
            </p>

            {artefacts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-full border-2 bg-[#F28E2B] p-6 text-white mt-10">
                You don"t have any artefacts yet.
              </div>
            )}

            <div className="masonry sm:masonry-sm md:masonry-md mt-10">
              {artefacts.length > 0 &&
                artefacts
                  .slice(0, currentSlice)
                  .map((obj, index) => (
                    <RenderNFT {...obj} key={"nft-" + index} />
                  ))}
            </div>

            {currentSlice < artefacts.length && (
              <div className="mt-10 w-full">
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 0.9, 1.02],
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                      loop: Infinity,
                    },
                  }}
                  className="rounded-2xl border-2 border-white bg-[#F6A546] px-12 py-3 font-league-gothic text-[25px] uppercase text-white transition-all hover:scale-105 hover:shadow-md"
                  onClick={handleLoadMore}
                >
                  Load more artefacts
                </motion.button>
              </div>
            )}
          </div>
        )}
      </AnimationWrapper>
      <ScrollSection />
      <Footer />
    </div>
  );
};

const RenderNFT = (artefact: any) => {
  const [data, setData] = useState<any>();

  const firstLoad = async () => {
    const response = await fetch(`/api/artefact/${artefact?.contract}`);

    const info = await response.json();

    setData(info);
  };

  useEffect(() => {
    firstLoad();
  }, []);

  if (data?.error) return <></>;

  if (!data?.data) {
    return (
      <div className="break-inside mt-4 h-auto w-full rounded-md border-2 border-gray-100/30 p-4 first:mt-0">
        <Skeleton height={50} />
        <div className="mt-3">
          <Skeleton count={5} height={30} />
        </div>
      </div>
    );
  }

  if (data?.type === ArtefactTypeEnum.HTML) {
    return (
      <div className="break-inside mt-4 h-auto w-full rounded-md border-2 border-gray-100/30 p-4 transition-all first:mt-0 hover:border-gray-100/60">
        <iframe
          src={`https://arweave.net/${data?.data?.media[0]}`}
          className="h-96 w-full"
        />
      </div>
    );
  }

  if (data?.type === ArtefactTypeEnum.TWEET) {
    return (
      <div className="break-inside mt-4 h-auto w-full rounded-md border-2 border-gray-100/30 p-4 transition-all first:mt-0 hover:border-gray-100/60">
        <div className="flex gap-4">
          <img
            src={data?.data?.avatar}
            alt="User twitter profile picture"
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-extrabold"> {data?.data?.user}</p>
            <p className="text-sm text-gray-800">@{data?.data?.username}</p>
          </div>
        </div>
        <p className="mt-4 text-2xl text-gray-900">{data?.data?.text}</p>
        {data?.data?.media.length > 0 && (
          <a
            href={`https://arweave.net/${data?.data?.media[0]}`}
            target="_blank"
          >
            <img
              src={`https://arweave.net/${data?.data?.media[0]}`}
              className="mt-4 w-28 rounded-md transition-all hover:scale-105"
            />
          </a>
        )}
      </div>
    );
  }

  return <></>;
};
export default Account;
