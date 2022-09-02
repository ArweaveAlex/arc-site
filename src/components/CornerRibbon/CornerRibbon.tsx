import cx from "classnames";
import { motion } from "framer-motion";

interface CornerRibbonProps {
  text: string;
}

const CornerRibbon = ({ text }: CornerRibbonProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className={
        "fixed top-4 -left-10 z-50 flex h-8 w-40 -rotate-45 items-center justify-center bg-red-100 bg-gradient-to-b  from-[#F9C04A] to-[#F6A646] text-center font-bold text-white shadow"
      }
    >
      {text}
    </motion.div>
  );
};

export default CornerRibbon;
