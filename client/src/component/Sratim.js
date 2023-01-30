import React, { useRef, useEffect, useState } from 'react';
// import Header from './Header.js';

function Sratim() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));
    const [favoriteGenreMoviesList, setFavoriteGenreMoviesList] = useState([]); //to render
    const [favoriteGenreMovies, setFavoriteGenreMovies] = useState([]); //from fetch request
    // const [userToDo, setUserToDo] = useState("");
    // const [mapToDo, setMapToDo] = useState([]);
    // const [flagOnlyCompleted, setFlagOnlyCompleted] = useState(false);

    // useEffect(() => {
    //     sendReq();
    // }, [flagOnlyCompleted])

    // useEffect(() => {
    //     makingToDoList();
    // }, [userToDo])

    // async function sendReq() {
    //     try {
    //         if (flagOnlyCompleted) {
    //             let response = await fetch(`http://localhost:4000/users/${userData.id}/complited-todos`);
    //             const data = await response.json();
    //             setUserToDo(data)
    //         }
    //         else {
    //             let response = await fetch(`http://localhost:4000/users/${userData.id}/todo`);
    //             const data = await response.json();
    //             setUserToDo(data)
    //         }
    //         // const data = await response.json();
    //         // setUserToDo(data)
    //     }
    //     catch (error) {
    //         console.log('error: ', error)
    //     }
    // }
    // async function sendReq() {
    //     try {
    //         const response = await fetch(`http://localhost:4000/users/${userData.id}/complited-todos`);
    //         const data = await response.json();
    //         setUserToDo(data)
    //     }
    //     catch (error) {
    //         console.log('error: ', error)
    //     }
    // }

    async function getFavoriteGenreMovies() {
        try {
            const response = await fetch(`http://localhost:5000/movies/favorite_genre_movies/user?user=${userData.name}`);
            const data = await response.json();
            setFavoriteGenreMovies(data)
        }
        catch (error) {
            console.log('error: ', error)
        }
    }

    // const changeElComplete = (index) => {
    //     const tempUserToDo = [...userToDo];
    //     tempUserToDo[index].complited = tempUserToDo[index].complited === 0 ? 1 : 0;
    //     setUserToDo(tempUserToDo)
    // }

    // const sortByComplited = () => {
    //     const tempUserToDo = [...userToDo];
    //     tempUserToDo.sort((a, b) => {
    //         if (a.complited === 1) { return 1; }
    //         return -1;
    //     });
    //     setUserToDo(tempUserToDo);
    // };

    // const sortById = () => {
    //     const tempUserToDo = [...userToDo];
    //     tempUserToDo.sort((a, b) => a.tood_id - b.tood_id);
    //     setUserToDo(tempUserToDo);
    // };

    // const sortByAlphabet = () => {
    //     const tempUserToDo = [...userToDo];
    //     tempUserToDo.sort((a, b) => a.title.localeCompare(b.title));
    //     setUserToDo(tempUserToDo);
    // };

    // const sortRandomly = () => {
    //     const tempUserToDo = [...userToDo];
    //     tempUserToDo.sort(() => 0.5 - Math.random());
    //     setUserToDo(tempUserToDo);
    // };

    // function makingToDoList() {
    //     setMapToDo(userToDo && userToDo?.map((item, index) =>
    //         <li className="todo-li" key={Math.random()} /*style={props.item.complited ? { backgroundColor: "rgb(10, 227, 10)" } : null}*/>
    //             <p className='id-p'>id: {item.tood_id}</p>
    //             <p>complited: {item.complited === 0 ? "no" : "yes"}</p>
    //             <div>
    //                 <input id={index} checked={item.complited === 0 ? false : true} type="checkbox" onChange={() => changeElComplete(index)}></input>
    //                 <label>{item.title}</label>
    //             </div>
    //         </li>
    //     ))
    // }

    function making_favorite_genre_movies_list() {
        setFavoriteGenreMoviesList(

        )
    }

    return (
        <>
            {/* <Header /><br /> */}
            <div>
                <h1>Movies</h1><br />
                <h3>Movies in your favorite genre:</h3>
                <ul>{favoriteGenreMovies}</ul>

                <hr />
                <h3>Movies you haven't watched yet:</h3>

                <hr />
                <h3>Watch again:</h3>

                <hr />
                {/* <div>
                    <button className="todo-button" onClick={sortByComplited}>sort by complited posts</button>
                    <button className="todo-button" onClick={sortById}>sort by posts id</button>
                    <button className="todo-button" onClick={sortByAlphabet}>sort by alphabet</button>
                    <button className="todo-button" onClick={sortRandomly}>sort randomly</button>
                    <button className="todo-button" onClick={()=>setFlagOnlyCompleted(true)}>show only complited</button>
                    <button className="todo-button" onClick={()=>setFlagOnlyCompleted(false)}>show all todos</button>
                </div> */}
                {/* <ul>{mapToDo}</ul> */}
            </div>
        </>
    );
}

export default Sratim;