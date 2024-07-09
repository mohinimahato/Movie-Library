import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();
    const API_KEY = '6a24d6f54a95e3db97df1168cb429dcf';
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const toggleSearch = () => {
        setSearchIsOpen(!searchIsOpen);
        if (!searchIsOpen) {
            setQuery('');
            setSuggestions([]);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setSuggestions([]);
            navigate(`/search/${query}`);
        }
    };

    const fetchSuggestions = async (searchQuery: string) => {
        if (searchQuery.trim().length > 1) {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
                );
                const data = await response.json();
                if (data.results) {
                    setSuggestions(data.results.map((movie: any) => movie.title));
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        fetchSuggestions(query);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const clearQuery = () => {
        setQuery('');
        setSuggestions([]);
    };

    return (
        <>
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-grow justify-center items-center mx-4">
                <div className="relative w-full max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-4 pr-12 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:bg-gray-600  shadow-md"
                        />
                        {query && (
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={clearQuery}
                                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white"
                            />
                        )}
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-full shadow-md hover:bg-gray-600"
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-gray-400 hover:text-white cursor-pointer"
                            />
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <ul ref={suggestionsRef} className="absolute top-full mt-2 w-full bg-gray-700 text-white rounded-md shadow-lg z-10">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setQuery(suggestion);
                                        setSuggestions([]);
                                        navigate(`/search/${suggestion}`);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>

            {/* Mobile Search */}
            <div className={`fixed top-0 left-0 right-0 p-4 bg-gray-800 z-50 ${searchIsOpen ? 'flex' : 'hidden'} items-center md:hidden`}>
                <button onClick={toggleSearch} className='text-neutral-300 hover:text-white focus:outline-none mr-4'>
                    <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
                </button>
                <div className='relative flex-grow'>
                    <form onSubmit={handleSearch} className='relative w-full'>
                        <input
                            type='text'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search...'
                            className='w-full pl-10 pr-16 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:bg-gray-600'
                        />
                        {query && (
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={clearQuery}
                                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white"
                            />
                        )}
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400 hover:text-white" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Search;
