import React from "react"

const Modal = ({ movie, closeModal }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <span className='close-modal' onClick={closeModal}>
          &times;
        </span>
        <div className='modal-body'>
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          
        </div>
      </div>
    </div>
  )
}

export default Modal
