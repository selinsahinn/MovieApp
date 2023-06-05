import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox"
import AddFavourites from "./components/AddFavourites"
import RemoveFavourites from "./components/RemoveFavourites"
import Card from "./components/Card"
import Modal from "./components/Modal"
import Pagination from "./components/Pagination"

const App = () => {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [movieSearchValue, setMovieSearchValue] = useState("")
  const [favouriteSearchValue, setFavouriteSearchValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=922a2636`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(movieSearchValue)
  }, [movieSearchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    )

    if (movieFavourites) {
      setFavourites(movieFavourites)
    }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    )

    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const openModal = (movie) => {
    setSelectedMovie(movie)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedMovie(null)
    setShowModal(false)
  }

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.Year - b.Year
    } else {
      return b.Year - a.Year
    }
  })

  const sortedFavourites = [...favourites].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.Year - b.Year
    } else {
      return b.Year - a.Year
    }
  })

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.Title.toLowerCase().includes(movieSearchValue.toLowerCase())
  )

  const filteredFavourites = sortedFavourites.filter((movie) =>
    movie.Title.toLowerCase().includes(favouriteSearchValue.toLowerCase())
  )

  const handleSortAscending = (type) => {
    if (type === "movies") {
      setSortOrder("asc")
    } else if (type === "favourites") {
      setSortOrder("asc")
      setFavourites([...favourites].sort((a, b) => a.Year - b.Year))
    }
  }

  const handleSortDescending = (type) => {
    if (type === "movies") {
      setSortOrder("desc")
    } else if (type === "favourites") {
      setSortOrder("desc")
      setFavourites([...favourites].sort((a, b) => b.Year - a.Year))
    }
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />

        <button
          className='sortAsbutton'
          onClick={() => handleSortAscending("movies")}
        >
          Sort Ascending
        </button>
        <button
          className='sortDesbutton'
          onClick={() => handleSortDescending("movies")}
        >
          Sort Descending
        </button>

        <SearchBox
          searchValue={movieSearchValue}
          setSearchValue={setMovieSearchValue}
        />
      </div>
      <div className='row'>
        <Card
          movies={filteredMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleCardClick={openModal}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />

        <SearchBox
          className='searchBox'
          searchValue={favouriteSearchValue}
          setSearchValue={setFavouriteSearchValue}
        />
      </div>

      <div className='row'>
        <Card
          movies={filteredFavourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
          handleCardClick={openModal}
        />
      </div>
      {showModal && selectedMovie && (
        <Modal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  )
}

export default App
