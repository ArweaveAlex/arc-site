import PoolCard from "@/components/PoolCard";

const PoolGrid = ({ data }) => {

  return (
    <>
      <div className="bg-library-gradient h-[233px] border-b-2 border-t-2 border-w mt-10" />

      <section className="container mx-auto -mt-40 mb-16 px-8">
        <h2 className="pb-10 font-league-gothic text-[54px] uppercase text-white">
          Archives
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {data.map((pool) => (
            <PoolCard {...pool} key={pool.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PoolGrid;
