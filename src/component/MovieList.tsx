import { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";

const MovieList: React.FC = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getData = useCallback(() => {
        if (loading) return;
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=6a24d6f54a95e3db97df1168cb429dcf&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setMovieList(prevMovies => [...prevMovies, ...data.results]);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching ${type ? type : "popular"} movies:`, error);
                setLoading(false);
            });
    }, [page, type, loading]);

    useEffect(() => {
        getData();
    }, [page, type]);

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="px-12 py-12">
            <h2 className="text-2xl font-bold my-10 text-center">
                {(type ? type : "POPULAR").toUpperCase()}
            </h2>
            <div className="flex flex-wrap justify-center">
                {movieList.map(movie => (
                    <Card movie={movie} key={movie.id} />
                ))}
            </div>
            {loading && <div className="text-center mt-10">Loading more movies...</div>}
        </div>
    );
}

export default MovieList;
