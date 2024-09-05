import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = ({ title, options, selectedValue, setSelectedValue }) => {
  return (
    <div className="filter-box2">
      <button className="w-full h-full bg-none border-none flex items-center justify-between px-2.5 cursor-pointer">
        <span className="text-sm font-nunito">
          {selectedValue ? selectedValue : title}
        </span>
        <FaAngleDown className="arrow-icon" />
      </button>
      <div className="filter-content hidden absolute bg-white shadow-lg z-10 w-full rounded-md mt-1">
        {options.map((option, index) => (
          <h1
            className="text-sm font-nunito text-black px-4 py-3 no-underline block border-b border-[#ddd] last:border-b-0 hover:bg-[#f5f5f5]"
            onClick={() => setSelectedValue(option)}
          >
            {option}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
