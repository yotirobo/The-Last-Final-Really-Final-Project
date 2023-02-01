import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';

function ShowInfo() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media, setMedia] = useState([]);
    const [insertMedia, setInsertMedia] = useState([]);
    const [trakingData, setTrakingData] = useState([]);
    const [trakingDataList, setTrakingDataList] = useState([]);

    let moment = require('moment');

    useEffect(() => {
        getTrakingData();
    }, [])

    useEffect(() => {
        if(trakingData.length) making_traking_information_list();
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
                <li key={index}> user {item.name} {item.description} at {moment.utc(item.time).format('MMM dd yyyy HH:mm:ss')} <br/> action type: {item.action_type}</li>
            )
        }))
    }

    return (
        <>
            <NavComponent />
            <div>
                <h1>Admin</h1>
                <p>add movie/tv show form:</p>
                {/* -it will set the media in this format: */}
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

