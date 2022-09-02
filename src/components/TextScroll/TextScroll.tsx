import Scroll from "./assets/Scroll";
import ScrollMobile from "../ScrollSection/assets/ScrollMobile";

const useTextScroll = () => {
  const DEFAULT_SCROLL_TEXT =
    "Heroes, let’s work together to include all voices in our history";

  return { DEFAULT_SCROLL_TEXT };
};

const TextScroll = ({ text }: { text: string }) => {
  const { DEFAULT_SCROLL_TEXT } = useTextScroll();

  return (
    <div className="container relative mx-auto mb-10 flex justify-center">
      <Scroll className="hidden md:flex" />
      <ScrollMobile className="md:hidden" />
      <span className="absolute top-56 left-0 right-0 ml-auto mr-auto px-20 text-center font-league-gothic text-[45px] uppercase md:top-36 md:px-12 md:text-[35px]">
        {text ?? DEFAULT_SCROLL_TEXT}
      </span>
    </div>
  );
};

export default TextScroll;
