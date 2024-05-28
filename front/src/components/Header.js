import React, { useEffect, useContext, useState } from 'react';
import GuideWrapper from "./GuideWrapper";
import API_URL from "..";
import axios from "axios";
import { useYourContext } from '../Context';

const Header = () => {
  const {
    searchText, setSearchText,
  } = useYourContext();


  return (
    <>
      <header className=" flex pr-8 bg-slate-900  text-white">
        <GuideWrapper/>
        <h1 className="text-6xl">
          <a href="/">Book</a>
        </h1>
        <input
          placeholder="Search"
          className="outline-none pl-1 text-black h-8 relative top-8 w-96 rounded mx-6"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </header>
    </>
  );
};

export default Header;
