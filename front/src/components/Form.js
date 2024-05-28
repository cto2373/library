import React, { useEffect, useState } from "react";
import API_URL from "..";
import axios from "axios";
import { useYourContext } from "../Context";

const Form = () => {
  const {
    searchText, setSearchText,
    books, 
    authors,
    filter, setFilter,
    sort, setSort,
    author_id, setAuthorId,
    genre,

    
    
    get_books,
    getGenreList,
    getAuthorList
  } = useYourContext();

  const MPA_Rating = [
    ["G", "General Audiences"],
    ["PG", "Parental Guidance Suggested"],
    ["PG-13", "Parents Strongly Cautioned"],
    ["R", "Restricted"],
    ["NC-17", "Adults Only"],
    ["NR", "Not Rated"],
  ];
  const [formData, setFormData] = useState({
    title: "",
    starRating: null,
    // rating: "NR",
    genre: [1], // Updated to a string for the selected genre
    year: "2002-01-01",
    author: 1,
    summary: "содержание",

    image: "media/photo/images.jpg",
  });

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }

    console.log(JSON.stringify(formData));
    fetch(API_URL + "/api/books/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(getGenreList, []);
  useEffect(getAuthorList, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-white">Title: </label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          // autoComplete="off"
          value={formData.title}
          onChange={handleChange}
        />
        <div>
          <label className="text-white">Rating: </label>
          <input
            // max={10}

            // min={0}
            name="starRating"
            // type="number"
            placeholder="Rating"
            autoComplete="off"
            value={formData.starRating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-white">Genre: </label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            {genre &&
              genre.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="text-white">MPA Rating: </label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {MPA_Rating &&
              MPA_Rating.map((rating) => (
                <option value={rating[0]}>
                  {"(" + rating[0] + ") " + rating[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="text-white">Year: </label>
          <input
            name="year"
            type="date"
            placeholder="Year"
            autoComplete="off"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-white">Run Time: </label>
          <input
            name="runTime"
            type="number"
            placeholder="Run Time"
            autoComplete="off"
            value={formData.runTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-white">Author: </label>
          <select name="author" value={formData.author} onChange={handleChange}>
            {authors &&
              authors.map((author) => (
                <option value={author.id}>{author.full_name}</option>
              ))}
          </select>
        </div>
        <input
        name="image"
        type="file"а
        accept="image/*"
        onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="bg-blue-400 text-white border-2 rounded-md px-3 border-blue-800 "
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default Form;
