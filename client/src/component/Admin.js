import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';

function ShowInfo() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media , setMedia] = useState([])

    let moment = require('moment');
    
    useEffect(() => {
        
    }, [])

//this how the fetch request should to look like
// fetch('http://localhost:5000/admin/media', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: media})
// })

    return (
        <>
            <NavComponent />
            <div>
                <h1>Admin</h1>
                <p>add movie/tv show form:</p>
            {/* -it will set the media in this format: */}
            {/* ['title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow'] */}
            {/* ['Strange World', './Media/Movies/Strange World.webm', './Media/Movies-Photos/Strange World.png', false, '2022-11-24', 52, 'Animated', 7.1, 'movie'], */}
            {/* and it will download video and img and put it in the folders required */}
                <hr />
                <p>remove movie/tv show form:</p>
                <hr />
            </div>
        </>
    );
}

export default ShowInfo;

