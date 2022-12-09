import { React, useEffect, useState } from "react";
import "./App.css";
import Search from "./icon.svg";
import Movies from "./Movies.jsx";
const API = "https://www.omdbapi.com?apikey=db1af5cd";

// sample object
const m1 = {
  Title: "Lego Marvel Super Heroes",
  Year: "2013",
  imdbID: "tt2620204",
  Type: "game",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTA5ODA2NTI2M15BMl5BanBnXkFtZTgwNTcxMzU1MDE@._V1_SX300.jpg",
};


const App_Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  // useEffect hook takes a call back fn and dependednt array
  // empty dependent array is needed because it aloows to render only at the begin, not every time
  useEffect(() => {
    getMovies("Marvel");
  }, []);

  // function which gets data from API 
  const getMovies = async (title) => {
    const response = await fetch(`${API}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div className="m_app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search here" value={searchTerm} onChange={(m) =>setSearchTerm(m.target.value)} />
        <img src={Search} onClick={() => getMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((mov) => {
            return <Movies m1={mov} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App_Movies;
