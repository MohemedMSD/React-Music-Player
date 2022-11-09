import React from "react";
import { Error, Loader, SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { genres } from "../assets/constants";
import { useGetSongByGenreQuery } from "../redux/servises/shazamCore";

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetSongByGenreQuery(
    genreListId || "POP"
  );

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreListId || "POP"}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "POP"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((item, index) => (
            <option key={index} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
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

export default Discover;
