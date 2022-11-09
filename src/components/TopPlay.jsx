import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetTopChartsQuery } from "../redux/servises/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import PlayPause from "./PlayPause";

const TopChartsCard = ({
  song,
  index,
  hundelPauseClick,
  hundelPlayClick,
  isPlaying,
  activeSong,
}) => (

  <div
    className="flex flex-row items-center
    p-4 py-2 mb-2 cursor-pointer justify-between rounded-lg hover:bg-[#595959]"
  >

    <div className="flex flex-row justify-center items-center">
      <p className="font-bold text-white text-base">{index + 1}.</p>
      <img
        src={song?.images?.coverart}
        alt="Img_song"
        className="w-16 h-16 mx-3 rounded-lg"
      />
      <div className="flex-1 flex flex-col mx-3 w-[130px] sm:w-[220px]">
        <h2 className="font-semibold truncate text-white text-lg">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </h2>

        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-sm  mt-1 text-gray-300">{song?.subtitle}</p>
        </Link>
      </div>
    </div>

    <PlayPause
      hundelPauseClick={hundelPauseClick}
      hundelPlayClick={hundelPlayClick}
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
    />

  </div>

);

const TopPlay = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const topPlays = data?.slice(0, 5);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const hundelPlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const hundelPauseClick = () => {
    dispatch(playPause(false));
  };

  return (

    <div
      ref={divRef}
      className="flex flex-col sm:animate-slideright flex-1 xl:ml-5 ml-0 xl:max-w-[500px] w-full xl:mb-0 mb-6"
    >

      {!isFetching && !error && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold text-white text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-poiter">See more</p>
            </Link>
          </div>

          <div className="flex flex-col mt-4 gap-1">
            {topPlays?.map((song, index) => (
              <TopChartsCard
                key={index}
                index={index}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                hundelPauseClick={hundelPauseClick}
                hundelPlayClick={() => hundelPlayClick(song, index)}
              />
            ))}
          </div>

          <div className="flex flex-row justify-between items-center mt-3">
            <h2 className="font-bold text-white text-2xl">Top Artists</h2>
            <Link to="/top-Artists">
              <p className="text-gray-300 text-base cursor-poiter">See more</p>
            </Link>
          </div>

          <Swiper
            spaceBetween={15}
            slidesPerView="auto"
            freeMode
            modules={[FreeMode]}
            className="mt-4"
            centeredSlides
            centeredSlidesBounds
          >
            {topPlays?.map((song, i) => (
              <SwiperSlide
                key={i}
                style={{ width: "23%", height: "Auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images?.background}
                    alt={song?.artists[0].alias}
                    className="object-cover w-full rounded-full"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      )}
    </div>
  );
};

export default TopPlay;
