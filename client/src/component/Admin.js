import e from 'cors';
import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';
import SearchBar from './search';
import Tracking from './Tracking2';

function ShowInfo() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media, setMedia] = useState([]);
    const [insertMedia, setInsertMedia] = useState([]);
    const [trakingData, setTrakingData] = useState([]);
    const [trakingDataList, setTrakingDataList] = useState([]);
    const [addFlag, setAddFlag] = useState(false);
    const [sortFlag, setSortFlag] = useState(false);
    const [selected, setSelected] = useState('');
    const [movieData, setMovieData] = useState({
        title: "",
        deleted: 0,
        publish_date: Date,
        likes: Number,
        genre: "",
        rate: Number,
        movie_or_TVShow: ""
    });

    let moment = require('moment');
    
    useEffect(() => {
        // fetchInsertMedia();
    }, [insertMedia])
    const handleAddMovie = (e) => {
        e.preventDefault();

        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
        console.log(`${[e.target.name]} : ` + `${e.target.value}`);
    };
    async function addMovieToDataBase() {
        console.log("yyyy", movieData);
        const response = await fetch('http://localhost:5000/admin/media/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: movieData.title,
                deleted: false,
                publish_Date: movieData.publish_date,
                likes: movieData.likes,
                genre: movieData.genre,
                rate: movieData.rate,
                movie_or_TVShow: movieData.movie_or_TVShow
            })
        })
        const data = await response.json();
        console.log(data);
        if (data) {
            alert('movie added successfully');
        } else {
            alert('movie not added please try again');
        }
    };

    const submitMovieButton = () => {
        setAddFlag(!addFlag)
        addMovieToDataBase();
    }

    //function that gets traking information:
    return (
        <>
            <NavComponent />
            <div>
                <h1>Admin</h1>
                <p>add movie/tv show:</p>
                <button type={'submit'} style={addFlag ? { display: "none" } : { display: "block" }} onClick={() => setAddFlag(!addFlag)}>add video</button>
                <form style={addFlag ? { display: "block" } : { display: "none" }}>
                    <input
                        type="text"
                        name='title'
                        onChange={handleAddMovie}
                        placeholder="title"

                    />
                    <label htmlFor="movie_or_TVShow">Movie or TV Show?</label>
                    <select onChange={handleAddMovie} name="movie_or_TVShow" id="movie_or_TVShow">
                        <option value="movie">Movie</option>
                        <option value="TVShow">Tv Show</option>

                    </select>
                    <input
                        type="date"
                        name='publish_date'
                        onChange={handleAddMovie}
                        placeholder="publish date"
                    />
                    <input
                        type="number"
                        name='likes'
                        onChange={handleAddMovie}
                        placeholder="likes"
                    />
                    <label htmlFor="genre">Choose your favorite:</label>
                    <select onChange={handleAddMovie} name="genre" id="genre">
                        <option value="Animated">Animated</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                        <option value="Drama">Drama</option>
                    </select>
                    <input
                        type="number"
                        name="rate"
                        onChange={handleAddMovie}
                        placeholder="rate"
                    />
                    <button onClick={submitMovieButton} type="submit">Add video!</button>
                </form>
                <hr />
                <p>remove movie/tv show form:</p>
                <SearchBar />
                <hr />
                <p>tracking:</p>
                <Tracking />

                {/* display filter by action buttons */}
            </div>
        </>
    );
}

export default ShowInfo;

