import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const PlayPause = ({
  hundelPauseClick,
  hundelPlayClick,
  song,
  isPlaying,
  activeSong,
}) => {
  return isPlaying && activeSong?.title === song?.title ? (
    <FaPauseCircle
      color="#1DB954"
      size={35}
      className="text-gray-300"
      onClick={hundelPauseClick}
    />
  ) : (
    <FaPlayCircle
      color="#1DB954"
      size={35}
      className="text-gray-300"
      onClick={hundelPlayClick}
    />
  );
};
export default PlayPause;
