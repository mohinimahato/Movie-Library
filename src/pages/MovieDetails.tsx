import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    logo_path: string;
    name: string;
}

interface MovieDetail {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    release_date: string;
    genres: Genre[];
    overview: string;
    homepage: string;
    imdb_id: string;
    production_companies: ProductionCompany[];
}

const MovieDetails: React.FC = () => {
    const [currentMovieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [id]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6a24d6f54a95e3db97df1168cb429dcf`)
            .then(res => res.json())
            .then(data => setMovieDetail(data))
            .catch(error => console.error(`Error fetching movies:`, error));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative w-full">
                <img
                    className="w-full h-96 object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path || ""}`}
                    alt={currentMovieDetail?.original_title || "Movie Backdrop"}
                />
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center w-3/4 relative -top-24">
                <div className="md:mr-8 mb-4 md:mb-0">
                    <img
                        className="w-72 rounded-lg shadow-lg"
                        src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path || ""}`}
                        alt={currentMovieDetail?.original_title || "Movie Poster"}
                    />
                </div>
                <div className="text-white flex flex-col space-y-4">
                    <div className="text-3xl font-bold">
                        {currentMovieDetail?.original_title || ""}
                    </div>
                    <div className="italic">
                        {currentMovieDetail?.tagline || ""}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 flex items-center">
                            {currentMovieDetail?.vote_average || ""} <FontAwesomeIcon icon={faStar} className="ml-1" />
                        </span>
                        <span>({currentMovieDetail?.vote_count} votes)</span>
                    </div>
                    <div>
                        {currentMovieDetail?.runtime ? `${currentMovieDetail.runtime} mins` : ""}
                    </div>
                    <div>
                        {currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}
                    </div>
                    <div className="flex flex-wrap space-x-2">
                        {currentMovieDetail?.genres?.map(genre => (
                            <span className="px-2 py-1 border border-white rounded-full" key={genre.id}>{genre.name}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-white w-3/4 relative -top-16">
                <div className="text-xl font-bold mb-2">Synopsis</div>
                <div className="leading-relaxed">{currentMovieDetail?.overview || ""}</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center w-3/4 my-8">
                <div className="text-white text-xl font-bold mb-4 md:mb-0">Useful Links</div>
                <div className="flex space-x-4">
                    {currentMovieDetail?.homepage && (
                        <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white font-bold px-4 py-2 rounded-full text-center">
                            Homepage <i className="fas fa-external-link-alt ml-2"></i>
                        </a>
                    )}
                    {currentMovieDetail?.imdb_id && (
                        <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-full text-center">
                            IMDb <i className="fas fa-external-link-alt ml-2"></i>
                        </a>
                    )}
                </div>
            </div>
            <div className="text-white text-xl font-bold mb-4">Production Companies</div>
            <div className="flex flex-wrap justify-center items-center w-4/5 mb-16">
                {currentMovieDetail?.production_companies?.map(company => (
                    company.logo_path && (
                        <div className="flex flex-col items-center m-4" key={company.logo_path}>
                            <img className="w-40 h-16 object-contain" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
                            <span className="mt-2 text-center">{company.name}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default MovieDetails;
