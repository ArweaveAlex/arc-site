import { PoolDetailTemplate } from "@/templates";
import dbConnect from "@/utils/DbConnect";
import PoolModel from "@/models/pool";
import { GetServerSideProps } from "next";

// get server side props filter slug
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  // get pool data
  await dbConnect();

  const NUMBER_OF_CHARACTERS_TO_MATCH_QUERY = 41;

  const poolData = await PoolModel.findOne({
    id: {
      $regex: slug?.slice(-NUMBER_OF_CHARACTERS_TO_MATCH_QUERY),
      $options: "i",
    },
  })
    .select(["-_id", "-ts"])
    .lean()
    .exec();

  return {
    props: {
      poolData: poolData,
    },
  };
};

const PoolWrapper = (data: any) => (
  <>
    <PoolDetailTemplate {...data} />
  </>
);

export default PoolWrapper;
