import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import slugify from "slugify";
import { PoolArweaveProps } from "../types/PoolArweaveProps";
import UkRuConflictImage from "@/public/assets/img/uk-ru-conflict.png";
import Image from "next/image";
import POOL_EXTRA_DATA from "@/utils/PoolExtraData";
import Arweave from "arweave";
// dump component

const usePoolCard = ({ id }: PoolArweaveProps) => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 40000,
    logging: false,
  });

  const CURRENT_POOL_EXTRA_DATA = POOL_EXTRA_DATA.find(
    (pool) => pool.contract.id === id
  );
  
  if (!CURRENT_POOL_EXTRA_DATA) {
    throw new Error(`Pool extra data with id ${id} not found`);
  }

  return {
    arweave,
    CURRENT_POOL_EXTRA_DATA,
  };
};

const PoolCard = (props: PoolArweaveProps) => {
  const { arweave, CURRENT_POOL_EXTRA_DATA } = usePoolCard(props);

  return (
    <Link
      href={`/pool/${slugify(
        props.state.title.toLowerCase() + "-" + props.id
      )}`}
    >
      <div className="flex cursor-pointer items-center gap-6 rounded-3xl border-2 border-white bg-gradient-to-b from-[#3A3124] to-[#645645] py-6 pl-9 font-lato transition-all hover:scale-105 hover:shadow-lg">
        <div className="hidden md:flex">
          <Image src={UkRuConflictImage} />
        </div>
        <div className="">
          <p className="text-[#F09240]">#{props.id.slice(0, 10)}...</p>
          <h3 className="text-2xl font-semibold text-white">
            {CURRENT_POOL_EXTRA_DATA.page.title}
          </h3>
          <div>
            <div
              className="pr-4 text-sm font-light text-white leading-8 mt-2"
              dangerouslySetInnerHTML={{
                __html:
                  CURRENT_POOL_EXTRA_DATA.page.description.slice(0, 180) +
                  "...",
              }}
            />
            <div className="mt-4 flex items-end justify-between rounded-tl-full rounded-bl-full border-2 border-r-0 border-white bg-[#393023] p-2 pl-4 pr-4">
              <span className="text-white">Total funded in $AR</span>
              <span className="bg-gradient-to-r from-[#F7CA4A] to-[#F09140] bg-clip-text font-bold text-transparent">
                {Math.floor(
                  +arweave.ar.winstonToAr(props?.state?.totalContributions) *
                    1e4
                ) / 1e4}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;
