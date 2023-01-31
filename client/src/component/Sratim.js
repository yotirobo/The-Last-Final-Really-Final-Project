import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';
import '../css/sratim&sdarot.css'

function Sratim() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [favoriteGenre, setFavoriteGenre] = useState("");
    const [favoriteGenreMovies, setFavoriteGenreMovies] = useState([]); //for fetch request that get favorite movies
    const [favoriteGenreMoviesList, setFavoriteGenreMoviesList] = useState([]); //to render favorite movies list
    const [unwatchedMovies, setUnwatchedMovies] = useState([]); //for fetch request that get unwatched movies
    const [unwatchedMoviesList, setUnwatchedMoviesList] = useState([]); //to render unwatched movies list
    const [watchedMovies, setWatchedMovies] = useState([]); //for fetch request that get watched movies
    const [watchedMoviesList, setWatchedMoviesList] = useState([]); //to render watched movies list

    let moment = require('moment');
    
    useEffect(() => {
        getFavoriteGenreMovies();
    }, [])

    useEffect(() => {
        making_favorite_genre_movies_list();
        getUnwatchedMovies();
    }, [favoriteGenreMovies])
    
    useEffect(() => {
        making_unwatched_movies_list();
        getWatchedMovies();
    }, [unwatchedMovies])
    
    useEffect(() => {
        making_watched_movies_list();
    }, [watchedMovies])

    //function that gets user favorite movies:
    async function getFavoriteGenreMovies() {
        try {
            const response = await fetch(`http://localhost:5000/movies/favorite_genre_movies/?user_id=${userData.user_id}`);
            const data = await response.json();
            setFavoriteGenreMovies(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }
    //function that prepare the div that will render in user favorite movies:
    function making_favorite_genre_movies_list() {
        setFavoriteGenreMoviesList(favoriteGenreMovies && favoriteGenreMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                    {setFavoriteGenre(item.genre)}
                    <img className="movie-img" src={`http://localhost:5000/movies/photo/?photo_src=${item.photo_src.split('./Media/Movies-Photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'>📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    //function that gets user unwatched movies:
    async function getUnwatchedMovies() {
        try {
            const response = await fetch(`http://localhost:5000/movies/unwatched_movies/?user_id=${userData.user_id}`);
            const data = await response.json();
            setUnwatchedMovies(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the div that will render in user unwatched movies:
    function making_unwatched_movies_list() {
        setUnwatchedMoviesList(unwatchedMovies && unwatchedMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                    <img className="movie-img" src={`http://localhost:5000/movies/photo/?photo_src=${item.photo_src.split('./Media/Movies-Photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'> {item.genre} <br /> 📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    //function that gets user watched movies:
    async function getWatchedMovies() {
        try {
            const response = await fetch(`http://localhost:5000/movies/watched_movies/?user_id=${userData.user_id}`);
            const data = await response.json();
            setWatchedMovies(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the div that will render in user watched movies:
    function making_watched_movies_list() {
        setWatchedMoviesList(watchedMovies && watchedMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                    <img className="movie-img" src={`http://localhost:5000/movies/photo/?photo_src=${item.photo_src.split('./Media/Movies-Photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'> {item.genre} <br /> 📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    return (
        <>
            <NavComponent />
            <div>
                <h1 className='media-h1'>Movies</h1><br />
                <h2 className='media-h2'>Movies in your favorite genre: {favoriteGenre}</h2>
                <ul className='images-ul'>{favoriteGenreMoviesList}</ul>
                <hr />
                <h2 className='media-h2'>Movies you haven't watched yet:</h2>
                <ul className='images-ul'>{unwatchedMoviesList}</ul>
                <hr />
                <h2 className='media-h2'>Watch again:</h2>
                <ul className='images-ul'>{watchedMoviesList}</ul>
                <hr />
                {/* <video style={{ width: '250px' }} src="http://localhost:5000/movies/toVideo" controls></video> */}
            </div>
        </>
    );
}

export default Sratim;