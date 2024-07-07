import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import MovieList from '../component/MovieList';

interface Movie {
    id: number;
    original_title: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

const Home: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=6a24d6f54a95e3db97df1168cb429dcf")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results))
            .catch(error => console.error("Error fetching popular movies:", error));
    }, []);

    return (
        <div className='poster'>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {popularMovies.map(movie => (
                    <div key={movie.id} className="relative">
                        <Link to={`/movie/${movie.id}`} className="no-underline text-white">
                            <div className='posterImage h-[650px] relative'>
                                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.original_title} className="w-full h-full object-cover object-top" />
                                <div className='posterImage__overlay absolute p-10 bottom-0 h-full flex flex-col w-full justify-end items-start bg-gradient-to-t from-black to-transparent opacity-100 transition-opacity duration-300'>
                                    <div className='posterImage__title font-extrabold text-4xl mb-2 text-left'>
                                        {movie?.original_title}
                                    </div>
                                    <div className='posterImage__runtime text-2xl mb-2 flex items-center'>
                                        {movie?.release_date}
                                        <span className='posterImage__rating ml-4 flex items-center'>
                                            {movie?.vote_average}
                                            <FontAwesomeIcon icon={faStar} className="ml-1" />
                                        </span>
                                    </div>
                                    <div className='posterImage__description italic text-base text-left w-full'>
                                        {movie?.overview}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
            <MovieList />
        </div>
    );
};

export default Home;
