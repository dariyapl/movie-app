import React from 'react';
import "../App.css"
import moviesList from "./MoviesList";


function MovieCard({movie}) {
    return (

           <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' className='movie__card'>
               <img src={
                   `https://image.tmdb.org/t/p/w500${movie.poster_path}`
               }
                    alt="Movie Poster" className='movie__poster'/>

               <div className="movie__details">
                   <h3 className='movie__details__heading'>{movie.original_title}</h3>
                   <div className='movie__date__rate'>
                       <p>{movie.realease_date}</p>
                       <p>{Math.round(movie.vote_average)}⭐️</p>
                   </div>
                        <p className='movie__description'>
                            {movie.overview.slice(0, 100)+'...'}
                        </p>
               </div>
           </a>
    )

}
export default MovieCard;