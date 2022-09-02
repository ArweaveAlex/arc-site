import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import cx from "classnames";

interface SocialCardDefinitionProps extends SocialCardProps {
  key: string;
}

interface SocialCardProps {
  href: string;
  logo: StaticImageData;
  alt: string;
  text: string;
  disabled?: boolean;
  newTab?: boolean;
}

const SocialCard = ({ href, logo, alt, text, disabled, newTab }: SocialCardProps) => {
  return (
    <Link href={href} passHref>
      <a target={newTab ? "_blank" : "_self"} rel="noreferrer">
        <div
          className={cx(
            "group relative flex flex-col items-center",
            disabled ? "cursor-not-allowed " : "cursor-pointer"
          )}
        >
          <div className="absolute -top-44 z-10 transition-all group-hover:-rotate-3">
            <Image src={logo} width={171} height={261} alt={alt} />
          </div>
          <div className="flex h-[100px] items-end justify-center rounded-3xl border-2 border-white bg-[#F28E2B] px-16 pt-36 pb-5 text-center font-league-gothic text-4xl uppercase text-white transition-all group-hover:rotate-1 md:text-2xl lg:text-4xl">
            {text}
          </div>
        </div>
      </a>
    </Link>
  );
};

export type {SocialCardDefinitionProps}

export default SocialCard
