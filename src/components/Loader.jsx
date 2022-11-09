import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loader = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">

          <div
            className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
            backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
          >

            <div className="relative w-full h-56 group">
              <Skeleton height={220} />
            </div>

            <div className="flex flex-col mt-4">
              <p className="font-semibold text-white text-lg truncate">
                <Skeleton />
              </p>

              <p className="text-sm truncate mt-1 text-gray-300">
                <Skeleton />
              </p>
            </div>
            
          </div>

    </SkeletonTheme>
  );
};

export default Loader;
