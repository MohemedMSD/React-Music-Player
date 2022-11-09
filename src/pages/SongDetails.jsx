import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {  RelatedSongs, Error, DetailsHeader } from "../components";
import LoaderForDetails from "../components/LoaderForDetails";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/servises/shazamCore";
const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);
    
  const {
    data,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery(songid);

  const hundelPlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const hundelPauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingSongRelated) return <LoaderForDetails />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-white">Lyric :</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry! not lyric found
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        activeSong={activeSong}
        isPlaying={isPlaying}
        hundelPlayClick={hundelPlayClick}
        hundelPauseClick={hundelPauseClick}
      />
    </div>
  );
};

export default SongDetails;
