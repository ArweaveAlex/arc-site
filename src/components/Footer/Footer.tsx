import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "../Navbar/assets/Logo";
import cx from "classnames";
import Credits from "../Navbar/assets/Credits";
import FOOTER_ITEMS from "@/utils/NavLinks";

const useFooter = () => {
  const router = useRouter();

  const currentPath = router.pathname;

  return { currentPath };
};

const Footer = () => {
  const { currentPath } = useFooter();

  return (
    <div className="-mt-10 flex justify-between rounded-tl-2xl rounded-tr-2xl border-t-2 border-white bg-gradient-to-b from-[#3D3327] to-[#635544]">
      <div className="container mx-auto mb-20 flex flex-col items-center justify-between gap-12 px-8 pt-8 antialiased md:flex-row md:gap-24 md:pt-16">
        <div className="">
          <Logo className="w-[180px] cursor-pointer md:w-[256px]" />
          <Credits className="w-[180px] cursor-pointer md:w-[256px]" inverse />
        </div>
        <div className="w-full">
          <ul className="flex w-full justify-center gap-10 border-b-2 border-black/20 pb-4 md:justify-end">
            {FOOTER_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.path} passHref>
                  <a
                    className={cx(
                      "font-league-gothic text-[32px] text-white hover:opacity-75",
                      currentPath !== item.path && "opacity-50"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex w-full justify-center text-white/75 md:justify-end">
            Copyright Bundlr © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
