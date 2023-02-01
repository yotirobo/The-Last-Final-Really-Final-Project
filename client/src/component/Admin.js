import e from 'cors';
import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';

function ShowInfo() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media, setMedia] = useState([]);
    const [insertMedia, setInsertMedia] = useState([]);
    const [trakingData, setTrakingData] = useState([]);
    const [trakingDataList, setTrakingDataList] = useState([]);
    const [query, setQuery] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const [addFlag, setAddFlag] = useState(false);
    const [movieData, setMovieData] = useState({
        title: "",
        video_src: "",
        photo_src: "",
        deleted: 0,
        publish_date: Date,
        likes: Number,
        genre: "",
        rate: Number,
        movie_or_TVShow: ""
    });

    let moment = require('moment');

    useEffect(() => {
        getTrakingData();
    }, [])

    useEffect(() => {
        if (trakingData.length) making_traking_information_list();
    }, [trakingData])

    useEffect(() => {
        // fetchInsertMedia();
    }, [insertMedia])

    // this how the fetch request should to look like
    function fetchInsertMedia() {
        fetch('http://localhost:5000/admin/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: media })
        })
    }

    //function that gets traking information:
    async function getTrakingData() {
        try {
            const response = await fetch(`http://localhost:5000/admin/traking`);
            const data = await response.json();
            setTrakingData(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the div that will render traking information:
    function making_traking_information_list() {
        setTrakingDataList(trakingData && trakingData?.map((item, index) => {
            return (
                <li key={index}> user {item.name} {item.description} at {moment.utc(item.time).format('MMM dd yyyy HH:mm:ss')} <br /> action type: {item.action_type}</li>
            )
        }))
    }
    const handleAddMovie = (e) => {
        e.preventDefault();

        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
        console.log(`${[e.target.name]} : ` +`${e.target.value}`);
    };
    async function addMovieToDataBase() {
        const response = await fetch('http://localhost:5000/admin/media/addMovie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: movieData.title,
            video_src: movieData.video_src,
            photo_src: movieData.photo_src,
            deleted: movieData.deleted,
            publish_Date: movieData.publish_date,
            likes: movieData.likes,
            genre: movieData.genre,
            rate: movieData.rate,
            movie_or_TVShow:movieData.movie_or_TVShow 
          })  
        })
        const data = await response.json();
        console.log(data);
        if (data) {
            alert('movie added successfully');
        }else{
            alert('movie not added please try again');
        }
    };
    // async function getMoviesData() {
    //     try {
    //         const response = await fetch(`http://localhost:5000/admin/media`);
    //         const data = await response.json();
    //         setMovieData({
    //             title: data.title,
    //             video_src: data.video_src,
    //             photo_src: data.photo_src,
    //             deleted: data.deleted,
    //             publish_date: data.publish_date,
    //             likes: data.likes,
    //             genre: data.genre,
    //             rate: data.rate,
    //             movie_or_TVShow: data.movie_or_TVShow
    //         })
    //     }
    //     catch (error) {
    //         console.log('error: ', error)
    //     }
    // }

    const submitMovieButton = () => {
        setAddFlag(!addFlag)
        addMovieToDataBase();
        console.log('movie:' + movieData.video_src + " photo" + movieData.photo_src)
    }
    return (
        <>
            <NavComponent />
            <div>
                <h1>Admin</h1>
                <p>add movie/tv show:</p>
                <button type={'submit'}style={addFlag ? { display: "none" } : { display: "block" }} onClick={()=> setAddFlag(!addFlag)}>add movie</button>
                <form style={addFlag ? { display: "block" } : { display: "none" }}>
                    <input
                        type="text"
                        name='title'
                        onChange={handleAddMovie}
                        placeholder="title"
                        
                    />
                    <input
                        type="text"
                        name='video_src'
                        onChange={handleAddMovie}
                        placeholder="video src"
                    />
                    <input
                        type="text"
                        name='photo_src'
                        onChange={handleAddMovie}
                        placeholder="photo src"
                    />
                    <input
                        type="boolean"
                        name='deleted'
                        onChange={handleAddMovie}
                        placeholder="deleted"
                    />
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
                    <input
                        type="text"
                        name='movie_or_TVShow'
                        onChange={handleAddMovie}
                        placeholder="movies or a TV show?"
                    />
                    <button onClick={submitMovieButton} type="submit">Add movie!</button>
                </form>
                {/* ['title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow'] */}
                {/* ['Strange World', './Media/Movies/Strange World.webm', './Media/Movies-Photos/Strange World.png', false, '2022-11-24', 52, 'Animated', 7.1, 'movie'], */}
                {/* onclick this form it will setInsertMedia that will make the fetch happend */}
                {/* and it will download video and img and put it in the folders required */}
                <hr />
                <p>remove movie/tv show form:</p>
                <hr />
                <p>traking:</p>
                <ul>{trakingDataList}</ul>
                {/* display filter by action buttons */}
            </div>
        </>
    );
}

export default ShowInfo;

