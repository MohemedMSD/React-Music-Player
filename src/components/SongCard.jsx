import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SongCard = ({ song, index, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const hundelPlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const hundelPauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >

      <div className="relative w-full h-56 group">

        <div
          className={`absolute z-10 inset-0 justify-center items-center bg-black 
          bg-opacity-50 group-hover:flex ${
            activeSong?.title === song?.title
              ? "flex bg-dark bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            hundelPauseClick={hundelPauseClick}
            hundelPlayClick={hundelPlayClick}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>

        <img src={song?.images?.coverart} alt="Img_song" />
        
      </div>

      <div className="flex flex-col mt-4">
        <p className="font-semibold text-white text-lg truncate">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>

        <p className="text-sm truncate mt-1 text-gray-300">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song?.subtitle}
          </Link>
        </p>
      </div>

    </div>
  );
};

export default SongCard;
