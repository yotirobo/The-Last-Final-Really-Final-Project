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
    const [PostStatus, setPostStatus] = useState("");
    const [reRenderPosts, setReRenderPosts] = useState("");//rerender posts after sending new post to server
    const [likeFlag, setLikeFlag] = useState(false);
    const [starFlag, setStarFlag] = useState(0);
    const [userChoise, setUserChoise] = useState([]);

    const addPostTitleRef = useRef();
    const addPostBodyRef = useRef();

    let moment = require('moment');

    useEffect(() => {
        setMedia_id(window.location.search.split('?media_id=')[1]);
    }, [])

    useEffect(() => {
        setAsWatched();
        making_video_render();
        getVideoInfo();
        getVideoPosts();
    }, [media_id, reRenderPosts])

    useEffect(() => {
        if (videoInfo.length) {
            making_video_information_div();
            making_video_title();
        }
        if (userChoise.length){
            setStarFlag(userChoise.rate)
            userChoise.liked === 0 ? setLikeFlag(false) : setLikeFlag(true);
        }
        making_posts_div();
    }, [videoInfo, videoPosts])

    useEffect(() => {
        setReRenderPosts(PostStatus)
    }, [PostStatus])

    useEffect(() => {
        rateVideo(starFlag)
    }, [starFlag])

    //function that gets data from DB:
    async function getAndSendData(fetchUrl, setDataFromFetch) {
        try {
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setDataFromFetch?.(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    //function that set the video as watched in the database:
    const setAsWatched = () => {
        if (media_id.length) {
            getAndSendData(`http://localhost:5000/videoPlayer/watched/?media_id=${media_id}&&user_id=${userData.user_id}`, setUserChoise)
        }
    };

    //function that prepare the video that will render:
    function making_video_render() {
        setVideo(
            <video src={`http://localhost:5000/videoPlayer/?media_id=${media_id}`} controls></video>
        )
    }

    //function that gets the video information:
    function getVideoInfo() {
        getAndSendData(`http://localhost:5000/videoPlayer/videoInfo/?media_id=${media_id}`, setVideoInfo)
    }

    //function that prepare the video information that will render:
    function making_video_information_div() {
        setVideoInfoDiv(
            <div className="video-info-container" >
                <span>{videoInfo[0].genre} {videoInfo[0].movie_or_TVShow === "movie" ? "Movie" : "TV Show"}</span><br /><br />
                <span>publish Date: 📆 {moment.utc(videoInfo[0].publish_Date).format('DD/MM/YY')}</span><br /><br />
                <span>likes: 👍🏼 {videoInfo[0].likes}</span><br /><br />
                <span>rate: ⭐ {videoInfo[0].rate}</span><br /><br />
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
        getAndSendData(`http://localhost:5000/videoPlayer/videoPosts/?media_id=${media_id}`, setVideoPosts)
    }

    //function that sets post as deleted:
    const deletePost = (post_id, user_id) => {
        getAndSendData(`http://localhost:5000/videoPlayer/deletePost/?post_id=${post_id}&&user_id=${user_id}`, setPostStatus)
    }

    //function that prepare the video posts that will render:
    function making_posts_div() {
        setVideoPostsDiv(videoPosts && videoPosts?.map((item, index) => {
            return (
                <div key={index} className="video-posts-container" >
                    <p>#{item.post_id}  &nbsp; &nbsp; {item.name}:</p>
                    <p></p>
                    <h4>{item.title}</h4>
                    <h7>{item.body}</h7>
                    <br /><br />
                    {userData.name === item.name || userData.is_admin === 1 ? <button onClick={() => deletePost(item.post_id, item.user_id)}>delete me</button> : null}
                </div>
            )
        }))
    }

    //function that send add post values to server
    const insretPost = (e) => {
        e.preventDefault();
        setShowAddPostFormFlag(false)
        getAndSendData(`http://localhost:5000/videoPlayer/addPost/?user_id=${userData.user_id}&&media_id=${media_id}&&title=${addPostTitleRef.current.value}&&body=${addPostBodyRef.current.value}`, setPostStatus)
    }

    //function that set likeFlag & send to server like information
    const likeVideo = () => {
        setLikeFlag(!likeFlag);
        getAndSendData(`http://localhost:5000/videoPlayer/like/?liked=${!likeFlag}&&user_id=${userData.user_id}&&media_id=${media_id}`)
    }

    //function that send to server rate information
    const rateVideo = () => {
        getAndSendData(`http://localhost:5000/videoPlayer/rate/?rate=${starFlag}&&user_id=${userData.user_id}&&media_id=${media_id}`)
    }

    return (
        <>
            <NavComponent />
            <div className='video-div'>
                {videoTitle}
                <br />
                {video}
                <div className='info-div' ><br />
                    <span>did you like this video? like and rate us! &nbsp; </span> <br /><br />
                    <span onClick={likeVideo}>{likeFlag ? "👍🏾 Thank You For Liking this video!" : "👍🏻"}</span> <br /><br />
                    <span onClick={() => setStarFlag(1)}>{starFlag > 0 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(2)}>{starFlag > 1 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(3)}>{starFlag > 2 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(4)}>{starFlag > 3 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(5)}>{starFlag > 4 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(6)}>{starFlag > 5 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(7)}>{starFlag > 6 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(8)}>{starFlag > 7 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(9)}>{starFlag > 8 ? "⭐" : "⚝"}</span>
                    <span onClick={() => setStarFlag(10)}>{starFlag > 9 ? "⭐" : "⚝"}</span><br /><br />
                    {videoInfoDiv}
                </div>
                <h3>posts:</h3>
                {videoPostsDiv.length ? videoPostsDiv : "there is no posts on this video yet, be the first person posting!"}

                <button className='form-buttons' style={showAddPostFormFlag ? { display: "none" } : { display: "block" }} onClick={() => setShowAddPostFormFlag(true)}>add post</button>
                <form style={showAddPostFormFlag ? { display: "block" } : { display: "none" }} onSubmit={insretPost}>
                    <h4>Add Post</h4>
                    <input type="text" ref={addPostTitleRef} placeholder='enter here post title' />
                    <input type="text" ref={addPostBodyRef} placeholder='enter here post content' />
                    <button className='form-buttons' type="submit">add</button>
                </form>
                {PostStatus.length && !showAddPostFormFlag ? PostStatus.split('aaa')[0] : null}
                {/* {PostStatus.length? setTimeout(setPostStatus(""),1000) : null} */}
            </div>
        </>
    );
}

export default VideoPlayer;