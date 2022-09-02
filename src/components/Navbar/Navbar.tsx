import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "./assets/Logo";
import cx from "classnames";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import Portal from "@/utils/Portal";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import Credits from "./assets/Credits";
import MENU_ITEMS from "@/utils/NavLinks";

const useNavbar = () => {
  const router = useRouter();

  const currentPath = router.pathname;

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleMobileMenuButton = () => {
    setMobileMenuVisible((prev) => !prev);
  };


  return {  currentPath, handleMobileMenuButton, mobileMenuVisible };
};

const Navbar = () => {
  const { currentPath, handleMobileMenuButton, mobileMenuVisible } =
    useNavbar();

  return (
    <>
      <AnimatePresence>
        {mobileMenuVisible && (
          // @ts-ignore
          <Portal>
            <motion.div
              initial={{
                opacity: 0,
                x: "50%",
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "tween",
                },
              }}
              exit={{
                opacity: 0,
                x: "100%",
              }}
              className="fixed top-0 left-0 h-full w-full bg-black"
            >
              <div className="flex justify-end px-8 pt-8">
                <button onClick={handleMobileMenuButton}>
                  <MdOutlineClose size="40" color="white" />
                </button>
              </div>

              <ul className="ml-10 flex flex-col items-start gap-8 font-league-gothic uppercase tracking-wide text-4xl text-white">
                {MENU_ITEMS.map(({ name, path }) => (
                  <Link href={path} key={name} passHref>
                    <li
                      className={cx(
                        "flex cursor-pointer flex-row-reverse items-center gap-5",
                        currentPath !== path && "opacity-40 grayscale"
                      )}
                    >
                      <p>{name}</p>
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </li>
                  </Link>
                ))}
              </ul>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>

      <section className="container mx-auto flex items-center justify-between px-8 pt-8 antialiased md:pt-16">
        <Link href="/" passHref>
          <div>
            <Logo className="w-[180px] cursor-pointer md:w-[256px]" />
            <Credits className="w-[180px] cursor-pointer md:w-[256px]"/>
          </div>
        </Link>
        {/* Desktop menu*/}
        <nav className="hidden md:flex">
          <ul className="flex gap-16 font-league-gothic text-[32px] text-black">
            {MENU_ITEMS.map(({ name, path }) => (
              <Link href={path} key={name} passHref>
                <li
                  className={cx(
                    "flex cursor-pointer flex-col items-center gap-2 transition-all",
                    currentPath !== path &&
                      "opacity-40 grayscale hover:opacity-60"
                  )}
                >
                  <p>{name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Mobile menu*/}
        <nav className="md:hidden">
          <button onClick={handleMobileMenuButton}>
            <HiMenu size={"40px"} />
          </button>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
