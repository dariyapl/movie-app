import React, {useEffect, useState} from "react";
import "../App.css";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {

        filterMovies();
    }, [searchQuery, minRating, movies]);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/popular?api_key=5cdb403c4da0dfb116bef14c92c18ac8'
            );
            const data = await response.json();
            setMovies(data.results);
            setFilteredMovies(data.results);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const filterMovies = () => {
        let filtered = [...movies];

        if (minRating > 0) {
            filtered = filtered.filter(movie => movie.vote_average >= minRating);
        }
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(movie =>
                movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMovies(filtered);
    };

    const handleFilter = (rate) => {
        if (rate === minRating) {
            setMinRating(0);
        } else {
            setMinRating(rate);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="movie__list">
            <header className="movie__list__header">
                <h2 className='movie__list__heading'>Popular</h2>

                <div className='movie_search'>
                    <label>
                        <input
                            onChange={handleSearchChange}
                            placeholder='Search movie...'
                            value={searchQuery}
                            type="text"
                        />
                    </label>
                </div>

                <div className='movie__list__fs'>
                    <ul className="movie__filter">
                        <li
                            className={minRating === 8 ? "movie__filter__item active" : "movie__filter__item"}
                            onClick={() => handleFilter(8)}
                        >8+ Star</li>
                        <li
                            className={minRating === 7 ? "movie__filter__item active" : "movie__filter__item"}
                            onClick={() => handleFilter(7)}
                        >7+ Star</li>
                        <li
                            className={minRating === 6 ? "movie__filter__item active" : "movie__filter__item"}
                            onClick={() => handleFilter(6)}
                        >6+ Star</li>
                    </ul>
                </div>
            </header>

            <div className="movie__cards">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p className="no-movies">No movies found.</p>
                )}
            </div>
        </section>
    );
}

export default MovieList;