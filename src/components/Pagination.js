import React, { useState } from "react"
const Pagination = ({
  movies,
  favouriteComponent,
  handleFavouritesClick,
}) => {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 6

  const handleViewClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseClick = () => {
    setSelectedMovie(null)
  }

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }


  return (
    <>
      <div className='card-container'>
        <div className='cards'>
          {currentMovies.map((movie, index) => (
            <div className='card' key={index}>
              <br />
              <br />
              <img src={movie.Poster} alt='movie' />
              <div className='card-body'>
                <div className='movie-details'>
                  <h5 className='card-title'>{movie.Title}</h5>
                  <p className='card-text'>{movie.Year}</p>
                </div>
                <button
                  className='view-button'
                  onClick={() => handleViewClick(movie)}
                >
                  View
                </button>
                <div
                  onClick={() => handleFavouritesClick(movie)}
                  className='overlay d-flex align-items-center justify-content-center'
                >
                  {favouriteComponent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='pagination'>
        <button
          className='pagination-button'
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className='pagination-current-page'>{currentPage}</span>
        <button
          className='pagination-button'
          disabled={currentMovies.length < moviesPerPage}
          onClick={handleNextPage}
        >
          Next
        </button>
        <br/><br/><br/><br/>
      </div>

      {selectedMovie && (
        <div className='card selected-card'>
          <br />
          <br />
          <img src={selectedMovie.Poster} alt='movie' />
          <div className='card-body'>
            <div className='movie-details'>
              <h5 className='card-title'>{selectedMovie.Title}</h5>
              <p className='card-text'>Year: {selectedMovie.Year}</p>
              <p className='card-text'>IMDB: {selectedMovie.imdbID}</p>
              <p className='card-text'>Type: {selectedMovie.Type}</p>
            </div>
            <button className='close-button' onClick={handleCloseClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
