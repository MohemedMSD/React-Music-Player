import SongBar from "./SongBar";
const RelatedSongs = ({
  data,
  activeSong,
  isPlaying,
  hundelPlayClick,
  hundelPauseClick,
  artistId,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <h1 className="font-bold text-3xl text-white">Related Songs : </h1>
      <div className="mt-6 w-full flex-col flex">
        {data?.map((song, i) => (
          <SongBar
            song={song}
            index={i}
            artistId={artistId}
            key={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            hundelPlayClick={hundelPlayClick}
            hundelPauseClick={hundelPauseClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
