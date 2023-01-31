import { date } from "joi";
import React, { useEffect, useState } from "react";
import NavComponent from "./navComponent";

function ShowInfo() {
    const currentUser = JSON.parse(localStorage.getItem("userOnline"));
    const [draw, setDraw] = useState([]);
    const [userData, setUserData] = useState({});
    const [ifData, setIfData] = useState(false)
    const [flag, setFlag] = useState(false)
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        password: "",
        email: "",
        age: Number,
        creditCard: Number,
        genre: "",
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
        const response = await fetch(`http://localhost:5000/profile?user_id=${currentUser.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileInfo.name,
                password: profileInfo.password,
                email: profileInfo.email,
                age: profileInfo.age,
                creditCard: profileInfo.creditCard,
                genre: profileInfo.genre,
                subscirbeTime: profileInfo.subscirbeTime
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
        const respone = await fetch(`http://localhost:5000/profile?user_id=${currentUser.user_id}`)
        const data = await respone.json();
        setIfData(true);
        let tempArray = [];
        for (let item in userData) {
            tempArray.push({ title: item, body: userData[item] })
        }
        setUserData(data[0])
        setDraw(tempArray)
    }
    const submitButton = () => {
        setFlag(!flag)
        edit();
    }

    const getType = (e) => {
        switch (e.target) {
            case "name":
                return 'text';
                break;
            case 'email':
                return 'email';
                break;
            case 'age':
                return 'number';
                break;
            case 'creditCard':
                return 'number';
                break;
            case 'genre':
                return 'text';
                break;
            case 'subscirbeTime':
                return 'date';
                break;
            default:
            // code block
        }

    }

    return (
        <>
            <NavComponent />
            <h1>Hello {profileInfo.name} Im your Profile</h1>
            <h3>And this is your info, you can see and edit it! </h3>
            {draw?.map((item) => {
                if (item.title === "is_admin") {
                    return "";
                }
                if (item.title === "user_id") {
                    return "";
                }
                if (item.title === "Account_expiration_date") {
                    return "";
                } else {
                    return (
                        <p onChange={handleChange} key={Math.random()}>
                            <b>{item.title}:</b>{item.body}
                            <input style={flag ? { display: "block" } : { display: "none" }} onChange={handleChange} type='text' id={item.title} required />
                        </p>);
                }
            })}
            <button onClick={() => setFlag(!flag)}>edit</button>
            <button style={flag ? { display: "block" } : { display: "none" }} onClick={submitButton}>Change!</button>
            <h2>Would you like to extend your subscription?</h2>
            <input onChange={handleChange} type='date' id={'Account_expiration_date'} required />
            <button onClick={edit}>extend!</button>
        </>
    )
}

export default ShowInfo;