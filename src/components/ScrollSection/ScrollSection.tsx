import TwitterLogo from "@/public/assets/img/twitter.png";
import DiscordLogo from "@/public/assets/img/discord.png";
import DocumentationImage from "@/public/assets/img/documentation.png";
import SocialCard, { SocialCardDefinitionProps } from "../SocialCard";

const useScrollSection = () => {
  const SOCIAL_CARDS: SocialCardDefinitionProps[] = [
    {
      key: "discord-card",
      href: "https://discord.gg/BqMh3X8VNb",
      logo: DiscordLogo,
      alt: "Discord",
      text: "Join us on discord",
      newTab: true,
    },
    {
      key: "documentation-card",
      href: "",
      logo: DocumentationImage,
      alt: "Get started",
      text: "Get started",
      disabled: true,
    },
    {
      key: "twitter-card",
      href: "https://twitter.com/Heroes0fHistory",
      logo: TwitterLogo,
      alt: "Twitter",
      text: "Follow us on twitter",
      newTab: true,
    },
  ];

  return { SOCIAL_CARDS };
};

const ScrollSection = () => {
  const { SOCIAL_CARDS } = useScrollSection();

  return (
    <>
      <div className="bg-library flex flex-col items-center justify-center gap-48 pb-40 pt-60 md:flex-row md:gap-20 border-t-2 border-white">
        {SOCIAL_CARDS.map(({ key, ...props }) => (
          <SocialCard {...props} key={key} />
        ))}
      </div>
    </>
  );
};

export default ScrollSection;
