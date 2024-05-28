import React from "react";
import MovieList from "./components/MovieBanner/MovieList";
import ActorDetail from "./components/Actor/ActorDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDeteil/MovieDetail";
import { YourProvider } from "./Context";

export default function App() {
  return (
    <YourProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/author/:id" element={<ActorDetail />} />
          <Route path="/book/:id" element={<MovieDetail />} />

          <Route path="/" element={<MovieList />} />
        </Routes>
      </Router>
    </YourProvider>
  );
}
 