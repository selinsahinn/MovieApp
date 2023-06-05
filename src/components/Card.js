import React, { useState } from "react"
import Pagination from "./Pagination"
import AddFavourites from "./AddFavourites"
import RemoveFavourites from "./RemoveFavourites"

const Card = (props) => {
  const handleFavouritesClick = (movie) => {
    if (props.handleFavouritesClick) {
      props.handleFavouritesClick(movie)
    }
  }

  const handleRemoveFavouritesClick = (movie) => {
    if (props.handleRemoveFavouritesClick) {
      props.handleRemoveFavouritesClick(movie)
    }
  }

  return (
    <div>
      <Pagination
        movies={props.movies}
        favouriteComponent={<AddFavourites />}
        handleFavouritesClick={handleFavouritesClick}
        removeFavouriteComponent={<RemoveFavourites />}
        handleRemoveFavouritesClick={handleRemoveFavouritesClick}
      />
    </div>
  )
}

export default Card
