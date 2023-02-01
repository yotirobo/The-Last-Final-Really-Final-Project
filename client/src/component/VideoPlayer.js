import React, { useEffect, useState } from 'react';
import '../css/videoPlayer.css'
import NavComponent from './navComponent';

function VideoPlayer() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media_id, setMedia_id] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoInfo, setVideoInfo] = useState([]); //for fetch request that gets video info
    const [videoInfoDiv, setVideoInfoDiv] = useState([]); //to render video info div
    const [video, setVideo] = useState([]); //to render video

    let moment = require('moment');

    useEffect(() => {
        setMedia_id(window.location.search.split('?media_id=')[1]);
    }, [])

    useEffect(() => {
        making_video_render();
        getVideoInfo();
    }, [media_id])

    useEffect(() => {
        if (videoInfo.length) {
            making_video_information_div();
            making_video_title();
        }
    }, [videoInfo])

    //function that prepare the video that will render:
    function making_video_render() {
        setVideo(
            <video src={`http://localhost:5000/videoPlayer/?media_id=${media_id}`} controls></video>
        )
    }

    //function that gets the video information:
    async function getVideoInfo() {
        try {
            const response = await fetch(`http://localhost:5000/videoPlayer/videoInfo/?media_id=${media_id}`);
            const data = await response.json();
            setVideoInfo(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that prepare the video information that will render:
    function making_video_information_div() {
        setVideoInfoDiv(
            <div className="video-info-container" >
                <p>{videoInfo[0].genre} {videoInfo[0].movie_or_TVShow === "movie" ? "Movie" : "TV Show"}</p>
                <p>publish Date: 📆 {moment.utc(videoInfo[0].publish_Date).format('DD/MM/YY')}</p>
                <p>likes: 👍🏼 {videoInfo[0].likes}</p>
                <p>rate: ⭐ {videoInfo[0].rate}</p>
            </div>
        )
    }

    //function that prepare the video title that will render:
    function making_video_title() {
        setVideoTitle(
            <h1 className='media-h1'>{videoInfo[0].title}</h1>
        )
    }

    console.log(videoInfo.length);
    return (
        <>
            <NavComponent />
            <div className='video-div'>
                {videoTitle}
                <br />
                {video}
                {videoInfoDiv}
            </div>
        </>
    );
}


export default VideoPlayer;