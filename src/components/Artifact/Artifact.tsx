import { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ArtifactProps {
  name: string;
  price: number;
  src: string | StaticImageData;
  delay: number;
  onClick: () => void;
}

const Artifact = ({ name, delay, onClick }: ArtifactProps) => (
  <motion.div
    className="flex flex-col gap-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0, transition: { delay } }}
    onClick={onClick}
  >
    {/* <div className="flex items-center justify-center rounded-[90.25px] bg-[#141414]">
      <Image src={src} width={250} height={250} />
    </div> */}
    <div className="flex flex-col items-center justify-center border-2 p-6 rounded-full cursor-pointer hover:shadow-lg bg-[#F28E2B] text-white">
      <div className="font-league-gothic text-2xl font-bold uppercase">
        {name}
      </div>
      {/* <div className="text-xl">{price} $AR</div> */}
    </div>
  </motion.div>
);

export default Artifact;
