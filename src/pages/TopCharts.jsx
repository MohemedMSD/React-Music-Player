import React from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/servises/shazamCore";
const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Charts</h2>
      </div>
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {isFetching &&
          Array(11)
            .fill(0)
            .map((item, i) => <Loader key={i} />)}
        {data?.map((song, index) => (
          <SongCard
            song={song}
            key={song.key}
            index={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
