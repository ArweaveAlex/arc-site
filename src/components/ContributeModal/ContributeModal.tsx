import Portal from "@/utils/Portal";
import { motion } from "framer-motion";
import React from "react";

const ContributeModal = ({
  handleBackgroundClick,
  handleSubmit,
  loading,
  poolData,
  balance,
  handleModal,
  CURRENT_POOL_EXTRA_DATA,
}) => (
  // @ts-ignore
  <Portal>
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          type: "tween",
        },
      }}
      exit={{
        opacity: 0,
      }}
      onClick={handleBackgroundClick}
      className="fixed top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-40"
    >
      <form
        className="z-30 flex w-[588px] flex-col gap-10 rounded-3xl bg-gradient-to-b from-[#3B3124] to-[#635544] py-14 px-10 text-white shadow-md"
        onSubmit={(e) => handleSubmit(poolData)(e)}
      >
        <div className="">
          <p className="bg-gradient-to-r from-[#F7CA4A] to-[#F09140] bg-clip-text font-righteous text-base text-transparent">
            #{poolData.id.split("-")[0]}
          </p>
          <p className="font-league-gothic text-4xl uppercase">
            {CURRENT_POOL_EXTRA_DATA.page.title}
          </p>
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            name="amount"
            className="w-full rounded-2xl border-2 border-[white] bg-transparent px-7 py-3 font-league-gothic text-xl tracking-wider text-white"
            placeholder="0.001"
            required
          />
          <div className="absolute top-2 right-4 bg-gradient-to-r from-[#F7CA4A] to-[#F09140] bg-clip-text font-league-gothic text-3xl text-transparent">
            $AR
          </div>
          <div className="absolute -top-6 right-3 text-xs text-[#7E7E7E]">
            Amount available:{" "}
            <span className="text-white">{balance || "Loading..."} $AR</span>
          </div>
        </div>
        <div className="flex justify-center">
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{
              scale: [1, 0.9, 1.02],
              transition: { duration: 0.5, ease: "easeInOut", loop: Infinity },
            }}
            onClick={handleModal}
            disabled={loading}
            className="rounded-2xl border-2 border-white bg-[#F6A546] px-12 py-3 font-league-gothic text-2xl uppercase transition-all hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {!loading && "Contribute now"}
            {loading && (
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
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  </Portal>
);

export default ContributeModal;
