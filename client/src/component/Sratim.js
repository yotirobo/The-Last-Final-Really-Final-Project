import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavComponent from './navComponent';
import '../css/sratim&sdarot.css'
let moment = require('moment');

function Sratim() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [favoriteGenre, setFavoriteGenre] = useState("");
    const [favoriteGenreMovies, setFavoriteGenreMovies] = useState([]); //for fetch request that get favorite movies
    const [favoriteGenreMoviesList, setFavoriteGenreMoviesList] = useState([]); //to render favorite movies list
    const [unwatchedMovies, setUnwatchedMovies] = useState([]); //for fetch request that get unwatched movies
    const [unwatchedMoviesList, setUnwatchedMoviesList] = useState([]); //to render unwatched movies list
    const [watchedMovies, setWatchedMovies] = useState([]); //for fetch request that get watched movies
    const [watchedMoviesList, setWatchedMoviesList] = useState([]); //to render watched movies list
    const navigate = useNavigate();



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


    //function that gets data from DB:
    async function getDataFromDB(fetchUrl, setDataFromFetch) {
        try {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setDataFromFetch(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }
    
    //function that gets user favorite movies:
    function getFavoriteGenreMovies() {
        getDataFromDB(`http://localhost:5000/movies/favorite_genre_movies/?user_id=${userData.user_id}`, setFavoriteGenreMovies)
    }

    //function that prepare the div that will render in user favorite movies:
    function making_favorite_genre_movies_list() {
        setFavoriteGenreMoviesList(favoriteGenreMovies && favoriteGenreMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container" onClick={() => navigate(`/videoPlayer?media_id=${item.media_id}`)}>
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
    function getUnwatchedMovies() {
        getDataFromDB(`http://localhost:5000/movies/unwatched_movies/?user_id=${userData.user_id}`, setUnwatchedMovies)
    }

    //function that prepare the div that will render in user unwatched movies:
    function making_unwatched_movies_list() {
        setUnwatchedMoviesList(unwatchedMovies && unwatchedMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container" onClick={() => navigate(`/videoPlayer?media_id=${item.media_id}`)}>
                    <img className="movie-img" src={`http://localhost:5000/movies/photo/?photo_src=${item.photo_src.split('./Media/Movies-Photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'> {item.genre} <br /> 📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    //function that gets user watched movies:
    function getWatchedMovies() {
        getDataFromDB(`http://localhost:5000/movies/watched_movies/?user_id=${userData.user_id}`, setWatchedMovies)
    }

    //function that prepare the div that will render in user watched movies:
    function making_watched_movies_list() {
        setWatchedMoviesList(watchedMovies && watchedMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container" onClick={() => navigate(`/videoPlayer?media_id=${item.media_id}`)}>
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
            </div>
        </>
    );
}

export default Sratim;