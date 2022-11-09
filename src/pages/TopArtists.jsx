import React from "react";
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/servises/shazamCore";
const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
      </div>
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {isFetching &&
          Array(11)
            .fill(0)
            .map((item, i) => <Loader key={i} />)}
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
