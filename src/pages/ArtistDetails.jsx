import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  RelatedSongs,
  Error,
  DetailsHeader,
} from "../components";
import LoaderForDetails from "../components/LoaderForDetails";
import { useGetArtistDetailsQuery } from "../redux/servises/shazamCore";
const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFetchingartistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);
  if (isFetchingartistDetails) return <LoaderForDetails />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />
    </div>
  );
};
export default ArtistDetails;
