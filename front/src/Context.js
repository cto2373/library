import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import API_URL from ".";

const YourContext = createContext();

export const YourProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genre, setGenre] = useState([]);
  
  const [author_id, setAuthorId] = useState("");

  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("-starRating");
  let genreList = ["All"];

  function get_books() {
    axios
      .get(API_URL + "/api/books", {
        params: {
          genre: filter,
          sort: sort,
          author_id: author_id,
          searchText: searchText,
        },
      })
      .then((response) => {
        setBooks(response.data);
        console.log(books);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  genre.map((genre) => genreList.push(genre.name));

  const getGenreList = () => {
    axios
      .get(API_URL + "/api/genres", {
        params: {
          author_id:author_id,
          genre_with_book:"True"
        },
      })
      .then((response) => {
        console.log("Genre List ",  response.data);
        setGenre(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const getAuthorList = () => {
    axios
      .get(API_URL + "/api/authors", {
        params: {
          
        },
      })
      .then((response) => {
        console.log("Author List",  response.data);
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <YourContext.Provider
      value={{
        searchText,
        setSearchText,
        books,
        authors,
        setBooks,
        filter,
        setFilter,
        author_id,
        setAuthorId,
        
        genre,
        setGenre,
        sort,
        setSort,
        genreList,
        get_books,
        getGenreList,
        getAuthorList,
      }}
    >
      {children}
    </YourContext.Provider>
  );
};

export const useYourContext = () => {
  return useContext(YourContext);
};
