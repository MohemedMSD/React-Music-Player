import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setInSearch } from "../redux/features/playerSlice";
const NavLinks = ({ hundelClick }) => (
  <div className="mt-7">
    {links.map((link, i) => (
      <NavLink
        key={i}
        className="flex flex-row justify-start items-center
          my-8 text-base font-medium text-gray-400 hover:text-[#1DB954]"
        to={link.to}
        onClick={hundelClick && (() => hundelClick())}
      >
        <link.icon className="w-6 h-6 mr-2" />
        <p>{link.name}</p>
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // set in OnSearch false for show component the TopPlay
  const hundelClickIN = () => {
    setmobileMenuOpen(false);
    dispatch(setInSearch(false));
  };

  return (
    <>
      <div className="md:flex hidden flex-col items-center py-7 px-4 w-[200px] bg-[#060606] ">
        <Link
          className="flex items-center ml-[-12px]"
          to="/React-Music-Player/"
          onClick={() => hundelClickIN()}
        >
          <img
            src="/src/assets/logo1.png"
            className="w-full h-24 object-contain"
          />
          <p className="font-semibold text-center tracking-md text-2xl ml-[-4px] text-gray-300">
            MSD
          </p>
        </Link>

        <NavLinks hundelClick={() => hundelClickIN()} />
      </div>

      <div className="absolute top-6 right-3 md:hidden block z-0">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setmobileMenuOpen(false)}
            className="h-6 w-6 text-white mr-2 cursor-pointer z-10"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setmobileMenuOpen(true)}
            className="h-6 w-6 text-white mr-2 cursor-pointer z-10"
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/20 to-black
        z-10 backdrop-blur-lg p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <Link to="/React-Music-Player/" onClick={() => hundelClickIN()}>
          <img
            src="/src/assets/logo1.png"
            className="w-full h-24 object-contain"
          />
          <p className="font-semibold text-center tracking-md text-2xl ml-2 mt-[-4px] text-gray-300">
            MSD
          </p>
        </Link>

        <NavLinks hundelClick={() => hundelClickIN()} />
      </div>
    </>
  );
};

export default Sidebar;
