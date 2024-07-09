// src/pages/SearchResults.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../component/Card';

interface Movie {
    id: number;
    poster_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

const SearchResults: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { query } = useParams<{ query: string }>();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=6a24d6f54a95e3db97df1168cb429dcf&query=${query}`)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(error => console.error('Error fetching search results:', error));
    }, [query]);

    return (
        <div className="px-12 py-12">
            <h2 className="text-2xl font-bold my-10">
                Search Results for "{query}"
            </h2>
            <div className="flex flex-wrap justify-center">
                {movies.map(movie => (
                    <Card movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
