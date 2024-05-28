import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../..";

export const FilterButton = ({name, isPressed, setFilter}) => {

    
  const filtration = (filterName) => {
    setFilter(filterName)
    console.log(filterName);
  }
  
  return (
    <button
      type="button"
      className={`block px-3 py-2 rounded-md ${isPressed ? 'bg-sky-500 text-white' : 'bg-slate-50 text-black'}`}
      aria-pressed={isPressed}
      onClick={() =>  filtration(name)}
    >
      <span className="sr-only">Show </span>
      <span>{name}</span>
      <span className="sr-only"> tasks</span>
    </button>
  );
};
