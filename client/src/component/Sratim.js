import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavComponent from './navComponent';
import '../css/Sratim.css'

function Sratim() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [favoriteGenre, setFavoriteGenre] = useState("");
    const [favoriteGenreMoviesList, setFavoriteGenreMoviesList] = useState([]); //to render
    const [favoriteGenreMovies, setFavoriteGenreMovies] = useState([]); //from fetch request
    let moment = require('moment');
    let navigate = useNavigate();


    useEffect(() => {
        getFavoriteGenreMovies();
    }, [])

    useEffect(() => {
        making_favorite_genre_movies_list();
    }, [favoriteGenreMovies])

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

    function making_favorite_genre_movies_list() {
        setFavoriteGenreMoviesList(favoriteGenreMovies && favoriteGenreMovies?.map((item, index) => {
            return (
                <div key={index} className="img-container" onClick={() => navigate(`/videoPlayer?video_src=${item.video_src.split('./Media/Movies/')[1]}}`)}>
                    {setFavoriteGenre(item.genre)}
                    <img className="movie-img" src={`http://localhost:5000/movies/photo/?photo_src=${item.photo_src.split('./Media/Movies-Photos/')[1]}`} />
                    <div class="img-titl-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'>📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div class="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    return (
        <>
            <NavComponent />
            <div>e
                <h1 className='movies-h1'>Movies</h1><br />
                <h2 className='movies-h2'>Movies in your favorite genre: {favoriteGenre}</h2>
                <ul className='images-ul'>{favoriteGenreMoviesList}</ul>
                <hr />
                <h2 className='movies-h2'>Movies you haven't watched yet:</h2>
                <hr />
                <h2 className='movies-h2'>Watch again:</h2>
                <hr />
                <video style={{ width: '250px' }} src="http://localhost:5000/movies/toVideo" controls></video>
            </div>
        </>
    );
}

export default Sratim;