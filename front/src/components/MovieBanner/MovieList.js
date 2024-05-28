import axios from "axios";
import Movies from "./Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API_URL from "../..";
import Form from "../Form";
import MovieSorting from "./MovieSorting";

export default function MovieList() {
  return (
    <>
      <MovieSorting />
      <Movies />
      <Form />
    </>
  );
}
