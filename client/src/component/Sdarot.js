import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';
import '../css/sratim&sdarot.css'

function Sdarot() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [favoriteGenre, setFavoriteGenre] = useState("");
    const [favoriteGenreTVshows, setFavoriteGenreTVshows] = useState([]); //for fetch request that get favorite TVshows
    const [favoriteGenreTVshowsList, setFavoriteGenreTVshowsList] = useState([]); //to render favorite TVshows list
    const [unwatchedTVshows, setUnwatchedTVshows] = useState([]); //for fetch request that get unwatched TVshows
    const [unwatchedTVshowsList, setUnwatchedTVshowsList] = useState([]); //to render unwatched TVshows list
    const [watchedTVshows, setWatchedTVshows] = useState([]); //for fetch request that get watched TVshows
    const [watchedTVshowsList, setWatchedTVshowsList] = useState([]); //to render watched TVshows list

    let moment = require('moment');
    
    useEffect(() => {
        getFavoriteGenreTVshows();
    }, [])

    useEffect(() => {
        making_favorite_genre_TVshows_list();
        getUnwatchedTVshows();
    }, [favoriteGenreTVshows])
    
    useEffect(() => {
        making_unwatched_TVshows_list();
        getWatchedTVshows();
    }, [unwatchedTVshows])
    
    useEffect(() => {
        making_watched_TVshows_list();
    }, [watchedTVshows])

    //function that gets user favorite TVshows:
    async function getFavoriteGenreTVshows() {
        try {
            const response = await fetch(`http://localhost:5000/TVshows/favorite_genre_TVshows/?user_id=${userData.user_id}`);
            const data = await response.json();
            setFavoriteGenreTVshows(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }
    //function that prepare the div that will render in user favorite TVshows:
    function making_favorite_genre_TVshows_list() {
        setFavoriteGenreTVshowsList(favoriteGenreTVshows && favoriteGenreTVshows?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                {console.log("🚀 ~ file: Sdarot.js:54 ~ setFavoriteGenreTVshowsList ~ item.photo_src", item.photo_src)}
                    {setFavoriteGenre(item.genre)}
                    <img className="movie-img" src={`http://localhost:5000/TVshows/photo/?photo_src=${item.photo_src.split('./Media/TV-Shows-photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'>📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    //function that gets user unwatched TVshows:
    async function getUnwatchedTVshows() {
        try {
            const response = await fetch(`http://localhost:5000/TVshows/unwatched_TVshows/?user_id=${userData.user_id}`);
            const data = await response.json();
            setUnwatchedTVshows(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the div that will render in user unwatched TVshows:
    function making_unwatched_TVshows_list() {
        setUnwatchedTVshowsList(unwatchedTVshows && unwatchedTVshows?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                    <img className="movie-img" src={`http://localhost:5000/TVshows/photo/?photo_src=${item.photo_src.split('./Media/TV-Shows-photos/')[1]}`} />
                    <div className="img-title-bottom-left">{item.title}</div>
                    <p className='img-info-bottom-p'> {item.genre} <br /> 📆 {moment.utc(item.publish_Date).format('DD/MM/YY')} 👍🏼 {item.likes} ⭐ {item.rate}</p>
                    {/* <div className="img-center">Centered</div> */}
                </div>
            )
        }))
    }

    //function that gets user watched TVshows:
    async function getWatchedTVshows() {
        try {
            const response = await fetch(`http://localhost:5000/TVshows/watched_TVshows/?user_id=${userData.user_id}`);
            const data = await response.json();
            setWatchedTVshows(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the div that will render in user watched TVshows:
    function making_watched_TVshows_list() {
        setWatchedTVshowsList(watchedTVshows && watchedTVshows?.map((item, index) => {
            return (
                <div key={index} className="img-container">
                    <img className="movie-img" src={`http://localhost:5000/TVshows/photo/?photo_src=${item.photo_src.split('./Media/TV-Shows-photos/')[1]}`} />
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
                <h1 className='media-h1'>TV Shows</h1><br />
                <h2 className='media-h2'>TVshows in your favorite genre: {favoriteGenre}</h2>
                <ul className='images-ul'>{favoriteGenreTVshowsList}</ul>
                <hr />
                <h2 className='media-h2'>TVshows you haven't watched yet:</h2>
                <ul className='images-ul'>{unwatchedTVshowsList}</ul>
                <hr />
                <h2 className='media-h2'>Watch again:</h2>
                <ul className='images-ul'>{watchedTVshowsList}</ul>
                <hr />
            </div>
        </>
    );
}

export default Sdarot;