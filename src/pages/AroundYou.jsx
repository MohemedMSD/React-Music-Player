import React from "react";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSongCountryQuery } from "../redux/servises/shazamCore";
const CountryTracks = () => {
  const [contry, setcontry] = useState("");
  const [loading, setloading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_izKzEYNx6DCc7YDgsD012oGKL5yE3&ipAddress=8.8.8.8"
      )
      .then((res) => setcontry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [contry]);

  const { data, isFetching, error } = useGetSongCountryQuery(contry);
  if (error && contry) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Around You {contry}
        </h2>
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

export default CountryTracks;
