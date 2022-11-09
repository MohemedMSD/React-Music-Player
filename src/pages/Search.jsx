import React, { useEffect, useRef } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongSearchQuery } from "../redux/servises/shazamCore";
import { useParams } from "react-router-dom";
const Search = () => {

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { searchTerm } = useParams();
  const divRef = useRef(null);
  const { data, isFetching, error } = useGetSongSearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song.track);


  if (error) return <Error />;

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div ref={divRef} className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="font-bold sm:text-3xl text-xl capitalize text-white text-left">
          Showing results for :
          <span className="text-[#1DB954]"> {searchTerm}</span>
        </h2>
      </div>
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
        {isFetching && Array(11)
              .fill(0)
              .map((item, i) => <Loader key={i} />)}
          {songs?.map((song, index) => (
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

export default Search;
