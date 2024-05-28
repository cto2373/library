import { useEffect, useState } from "react";
import Nav from "./Nav.js";
import NavItem from "./NavItem.js";
import List from "./List.js";
import { FilterButton } from "./FilterButton.js";
import ListItem from "./ListItem.js";
import axios from "axios";
import API_URL from "../..";
import { useYourContext } from "../../Context.js";


export default function  ({id}) {
  
  const {
    searchText, setSearchText,
    books, 
    filter, setFilter,
    sort, setSort,
    author_id, setAuthorId,
    
    genreList,
    
    get_books,
    getGenreList
  } = useYourContext();
  

  
  useEffect(get_books,[filter, sort,author_id, searchText]);
  useEffect(getGenreList, author_id );
  console.log(searchText);
  
  return (
    <div className="divide-y divide-black">
      <Nav>
        {genreList &&
          genreList.map((name) => (
            <FilterButton
              key={name}
              name={name}
              isPressed={name === filter}
              setFilter={setFilter}
            />
          ))}
      
      </Nav>
      <List>
        {books && books.map((book) => {
           
          return <ListItem key={book.id} book={book} author_id={author_id} />;
        })}
      </List>

    </div>
  );
};
