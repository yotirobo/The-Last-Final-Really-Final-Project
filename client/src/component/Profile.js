import e from "cors";
import { number } from "joi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowInfo() {
    const [id, setId] = useState(JSON.parse(localStorage.getItem("userOnline")).user_id);
    const [draw, setDraw] = useState([]);
    const [userData, setUserData] = useState({});
    const [ifData, setIfData] = useState(false)
    const [profileInfo , setProfileInfo ] = useState({
        username: "",
        password: "",
        email: "",
        age: Number,
        creditCard: Number,
        janer: "",
        subscirbeTime: Number
    })
    const handleChange = (e) => {
        e.preventDefault();
        setProfileInfo({
          ...profileInfo,
          [e.target.name]: e.target.value
    })
};
    useEffect(() => {
        myInfo();
    }, []) // at the first time the page loads

    useEffect(() => {
        myInfo();
    }, [ifData]) // if the data didnt fetch then try again...

    const edit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/profile?user_id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: profileInfo.username,
                password: profileInfo.password,
                email: profileInfo.email,
                age: profileInfo.age,
                creditCard: profileInfo.creditCard,
                janer: profileInfo.janer,
                subscirbeTimem: profileInfo.subscirbeTime
            })
        });
        let data = await response.json();
        console.log(data)
        if (data) {
            alert('Updated!')
            window.location.reload();
            return;
        } else {
            alert('Something went wrong please try again')
            window.location.reload();
        }
    }

    const myInfo = async () => {
        const respone = await fetch(`http://localhost:5000/profile?user_id=${id}`)
        const data = await respone.json();
        setIfData(true);
        let tempArray = [];
        for (let item in userData) {
            tempArray.push({ title: item, body: userData[item] })
        }
        setUserData(data[0])
        setDraw(tempArray)
    }


    return (
        <>
            <Link to="/sdarot">Sdarot</Link>
            <Link to="/sratim">Sratim</Link>
            <Link to="/rofile">Your profile</Link>
            <Link to="/">LogOut</Link>
            <h1>Hello Im your Profile</h1>
            {draw?.map((item) => {
                if (item.title === "password") {
                    return "";
                } else {
                    return <p onChange={handleChange} key={Math.random()}><b>{item.title}: </b>{item.body}, <a onClick={edit}>edit</a></p>;
                }
            })}
        </>
    )
}

export default ShowInfo;