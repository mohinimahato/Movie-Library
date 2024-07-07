import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='w-56 h-80'>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} className="text-white no-underline mx-2 my-2">
          <div className='w-56 h-80 relative rounded-lg overflow-hidden border border-gray-600 cursor-pointer transition-transform transform hover:scale-105'>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
              alt={movie ? movie.original_title : "Movie Poster"}
            />
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200'>
              <div className='text-lg font-bold mb-1'>
                {movie ? movie.original_title : ""}
              </div>
              <div className='text-sm mb-2'>
                {movie ? movie.release_date : ""}
                <span className='ml-3 text-'>
                  {movie ? movie.vote_average : ""}
                  <FontAwesomeIcon icon={faStar} className="ml-1" />
                </span>
              </div>
              <div className='text-xs italic opacity-75'>
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
