import {
  AnimationWrapper,
  CornerRibbon,
  Navbar,
  PoolGrid,
  ScrollSection,
} from "@/components";
import Footer from "@/components/Footer";
import PoolModel from "@/models/pool";
import dbConnect from "@/utils/DbConnect";
import { CURRENT_WHITELISTED_POOLS } from "@/utils/PoolExtraData";
import { NextSeo } from "next-seo";

const Index = ({ data }) => {
  return (
    <>
      <CornerRibbon text="Alpha" />

      <NextSeo
        title={"Heroes of History | Preserve our history, preserve our future"}
        description={
          "Heroes of History empowers individuals to preserve our history. Become a hero by contributing to a historical archive and earning artifacts that represent a piece of our history."
        }
      />
      <Navbar />
      <AnimationWrapper>
        <PoolGrid data={data} />
      </AnimationWrapper>
      <ScrollSection />
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();


  const allPools = await PoolModel.find({
    id: CURRENT_WHITELISTED_POOLS
  }).select(["-_id", "-ts"]).lean().exec();

  return {
    props: {
      data: allPools,
    },
  };
}

export default Index;
