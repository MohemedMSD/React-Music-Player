import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setInSearch} from '../redux/features/playerSlice'
const Searchbar = () => {

  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const hundelSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== "") {
      navigate(`/Search/${searchTerm}`); 
      dispatch(setInSearch(true))
      console.log(true);
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={hundelSubmit}
      className="py-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search" className="sr-only">
        Search For All song
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch color="#1ed760" className="w-5 h-5 ml-4" />
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
          placeholder="Search"
          autoComplete="off"
          className="p-4 flex-1 bg-transparent border-none
          outline-none placeholder:text-gray-300 text-base text-white"
        />
      </div>
    </form>
  );
};

export default Searchbar;
