import {useEffect, useState} from 'react';

import FilmCard from './FilmCard';

import './App.css';
import SearchIcon from './search.svg'

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=ba2861bd';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        //calling API
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    useEffect( () => {
        searchMovies('Batman');
    }, []);

    return (
        <div className="app">
            <h1> Film Library </h1>
            <p>
                    Input your keyword and press the search button.
                </p>
            <div className="search">
                
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src ={SearchIcon}
                    alt="Search"
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 
                ? (
                    <div className="container">
                    {
                        movies.map((movie) => (
                            <FilmCard movie ={movie} />
                        ))
                    }
                    </div>
                ) : (
                    <div className="empty">
                        <h2> No Movies Found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;