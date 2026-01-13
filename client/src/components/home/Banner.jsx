import React from "react";

const Banner = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[150] py-2.5 font-medium text-sm text-purple-800 text-center bg-gradient-to-r from-[#D78FEE] to-[#FDFEFF] shadow-sm">
      <p className="text-[#9519be]">
        <span className="px-3 py-1 rounded-lg text-white bg-[#c446ee] mr-2">
          New
        </span>
        AI Feature Added
      </p>
    </div>
  );
};

export default Banner;
