import ContributeModal from "@/components/ContributeModal";

import {
  AnimationWrapper,
  CornerRibbon,
  Footer,
  Navbar,
  ScrollSection,
  TextScroll,
} from "@/components/BACKUP";
import { PoolArweaveProps } from "@/components/types/PoolArweaveProps";

import { AnimatePresence, motion } from "framer-motion";

import UkRuConflictImage from "@/public/assets/uk-ru-conflict-big.png";
import Image from "next/image";

import cx from "classnames";
import { NextSeo } from "next-seo";
import { usePool } from "./usePool";
export interface ContractDataProps {
  title: string;
  useOfProceeds: string;
  link: string;
  owner: string;
  contributors: unknown;
  tokens: unknown;
  totalContributions: string;
  totalSupply: string;
}

interface PoolProps {
  poolData: PoolArweaveProps;
}

const PoolDetailTemplate = ({ poolData }: PoolProps) => {
  const {
    arweave,
    balance,
    CURRENT_POOL_EXTRA_DATA,
    loading,
    modalOpen,
    handleModal,
    handleSubmit,
    handleBackgroundClick,
    refreshedPoolData,
  } = usePool(poolData.id);

  return (
    <>
      <CornerRibbon text="Alpha" />

      <NextSeo
        title={`${CURRENT_POOL_EXTRA_DATA.page.title} | Heroes of History`}
        description={CURRENT_POOL_EXTRA_DATA.page.description}
      />
      <AnimatePresence>
        {modalOpen && (
          <ContributeModal
            handleBackgroundClick={handleBackgroundClick}
            handleSubmit={handleSubmit}
            poolData={poolData}
            balance={balance}
            loading={loading}
            handleModal={handleModal}
            CURRENT_POOL_EXTRA_DATA={CURRENT_POOL_EXTRA_DATA}
          />
        )}
      </AnimatePresence>

      <div>
        <Navbar />
        <AnimationWrapper>
          <div className="container mx-auto mt-2 mb-4 grid grid-cols-12 gap-10 p-4 md:mt-20 md:p-0">
            <div className="col-span-12 grid w-full grid-cols-12 rounded-3xl border-2 border-white bg-gradient-to-b from-[#382E22] to-[#645645] p-8">
              <div className="col-span-12 md:col-span-8">
                <h2 className="bg-gradient-to-r from-[#F7CA4A] to-[#F09140] bg-clip-text font-league-gothic text-[72px] uppercase text-transparent">
                  {CURRENT_POOL_EXTRA_DATA.page.title}
                </h2>
                <h3 className="font-bold text-white">
                  {CURRENT_POOL_EXTRA_DATA.page.subtitle}
                </h3>
                <div className="mt-8 h-3 w-28 bg-[#F6A546]  " />
                <p className="py-8 font-extralight leading-10 text-white">
                  {(refreshedPoolData ?? poolData)?.state?.description}
                </p>
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
                  onClick={handleModal}
                >
                  Contribute
                </motion.button>
              </div>

              <div className="col-span-4 hidden items-center justify-center p-10 md:flex">
                <Image src={UkRuConflictImage} alt="Russia logo" />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-10">
              <AnimatePresence>
                <StatsCard
                  title={"Total funded"}
                  css={"col-span-12 md:col-span-4"}
                  delay={0.2}
                >
                  {Math.floor(
                    +arweave.ar.winstonToAr(
                      (refreshedPoolData ?? poolData)?.state?.totalContributions
                    ) * 1e5
                  ) / 1e5}
                  <span className="ml-2 text-4xl">$AR</span>
                </StatsCard>
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="col-span-12 rounded-3xl border-2 border-white bg-gradient-to-b from-[#382E22] to-[#645645] p-8 md:col-span-5"
              >
                <h4 className="text-white">Current funds remaining</h4>
                <div
                  role="progressbar"
                  className="mt-4 h-3 w-full rounded-md bg-orange-50"
                />
              </motion.div>
              <StatsCard
                title={"Artifacts created"}
                css={"col-span-12 md:col-span-3"}
                delay={0.6}
              >
                {(refreshedPoolData ?? poolData)?.artefacts}
              </StatsCard>
            </div>
            <div className="col-span-12 w-full">
              <h2 className="font-league-gothic text-3xl">Learn more</h2>
              <p className="mt-4 leading-10">
                Censorship during a time of war is undeniable, even more so when
                countries that already have mass control over what is said and
                written, are involved. It was inevitable that we would see high
                levels of censorship during this time. The truth must be
                preserved, which is why this Archive was created. We want
                everyone to have their voice heard, so we and future generations
                can truly understand what has happened.
              </p>
            </div>
          </div>
        </AnimationWrapper>
        <TextScroll text={CURRENT_POOL_EXTRA_DATA.page.scrollText} />
        <ScrollSection />
        <Footer />
      </div>
    </>
  );
};

const StatsCard = ({ title, children, css, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0, transition: { delay } }}
    className={cx(
      "flex flex-col justify-center rounded-3xl border-2 border-white bg-gradient-to-b from-[#382E22] to-[#645645] py-8 px-6",
      css
    )}
  >
    <h4 className="text-white">{title}</h4>
    <p className="bg-gradient-to-r from-[#F18D2A] to-[#F19841] bg-clip-text font-league-gothic text-[96px] leading-none text-transparent">
      {children}
    </p>
  </motion.div>
);

export default PoolDetailTemplate;
