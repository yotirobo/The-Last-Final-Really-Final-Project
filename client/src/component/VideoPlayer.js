import React, { useEffect, useRef, useState } from 'react';
import '../css/videoPlayer.css'
import NavComponent from './navComponent';

function VideoPlayer() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [media_id, setMedia_id] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [video, setVideo] = useState([]); //to render video
    const [videoInfo, setVideoInfo] = useState([]); //for fetch request that gets video info
    const [videoInfoDiv, setVideoInfoDiv] = useState([]); //to render video info div
    const [videoPosts, setVideoPosts] = useState([]); //for fetch request that gets video posts
    const [videoPostsDiv, setVideoPostsDiv] = useState([]); //to render video posts div
    const [showAddPostFormFlag, setShowAddPostFormFlag] = useState(false); //
    const [addPostStatus, setAddPostStatus] = useState("");
    const [reRenderPosts, setReRenderPosts] = useState("");//rerender posts after sending new post to server
    const addPostTitleRef = useRef();
    const addPostBodyRef = useRef();

    let moment = require('moment');

    useEffect(() => {
        setMedia_id(window.location.search.split('?media_id=')[1]);
    }, [])

    useEffect(() => {
        console.log("a");
        making_video_render();
        getVideoInfo();
        getVideoPosts();
    }, [media_id, reRenderPosts])

    useEffect(() => {
        if (videoInfo.length) {
            making_video_information_div();
            making_video_title();
        }
        if (videoPosts.length) {
            making_posts_div();
        }
    }, [videoInfo, videoPosts])

    useEffect(() => {
        setReRenderPosts(addPostStatus)
    }, [addPostStatus])

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

    //function that prepare the video that will render:
    function making_video_render() {
        setVideo(
            <video src={`http://localhost:5000/videoPlayer/?media_id=${media_id}`} controls></video>
        )
    }

    //function that gets the video information:
    function getVideoInfo() {
        getDataFromDB(`http://localhost:5000/videoPlayer/videoInfo/?media_id=${media_id}`, setVideoInfo)
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

    //function that gets the video posts:
    function getVideoPosts() {
        getDataFromDB(`http://localhost:5000/videoPlayer/videoPosts/?media_id=${media_id}`, setVideoPosts)
    }

    //function that prepare the video posts that will render:
    function making_posts_div() {
        setVideoPostsDiv(videoPosts && videoPosts?.map((item, index) => {
            return (
                <div key={index} className="video-posts-container" >
                    <p>#{item.post_id}  &nbsp; &nbsp; {item.name}:</p>
                    <p></p>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                </div>
            )
        }))
    }

    //function that send add post values to server
    const insretPost = (event) => {
        event.preventDefault();
        setShowAddPostFormFlag(false)
        getDataFromDB(`http://localhost:5000/videoPlayer/addPost/?user_id=${userData.user_id}&&media_id=${media_id}&&title=${addPostTitleRef.current.value}&&body=${addPostBodyRef.current.value}`, setAddPostStatus)
    }

    console.log("y", addPostStatus);
    return (
        <>
            <NavComponent />
            <div className='video-div'>
                {videoTitle}
                <br />
                {video}
                {videoInfoDiv}
                <h4>posts:</h4>
                {videoPostsDiv.length ? videoPostsDiv : "there is no posts on this video yet, be the first person posting!"}

                <button className='form-buttons' style={showAddPostFormFlag ? { display: "none" } : { display: "block" }} onClick={() => setShowAddPostFormFlag(true)}>add post</button>
                <form style={showAddPostFormFlag ? { display: "block" } : { display: "none" }} onSubmit={insretPost}>
                    <h4>Add Post</h4>
                    <input type="text" ref={addPostTitleRef} placeholder='enter here post title' />
                    <input type="text" ref={addPostBodyRef} placeholder='enter here post content' />
                    <button className='form-buttons' type="submit">add</button>
                </form>
                {addPostStatus.length && !showAddPostFormFlag ? addPostStatus.split('0')[0] : null}
                {/* {addPostStatus.length? setTimeout(setAddPostStatus(""),1000) : null} */}
            </div>
        </>
    );
}

export default VideoPlayer;