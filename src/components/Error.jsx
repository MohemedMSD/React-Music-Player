import React from 'react';
import {BiErrorCircle} from 'react-icons/bi' 
const Error = () => (
  <div className='w-full flex h-[90vh] flex-col justify-center items-center'>
    <BiErrorCircle size={50} className="text-gray-400"/>
    <h2 className='font-bold text-2xl text-gray-400'>Something went wrong. Please try again.</h2>
  </div>
);

export default Error;
