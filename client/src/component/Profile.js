import React, { useEffect, useState } from "react";
import NavComponent from "./navComponent";
import '../css/profile.css';

function ShowInfo() {
    const [currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem("userOnline")));
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
        Account_expiration_date: Number
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


    const myInfo = async () => {
        const respone = await fetch(`http://localhost:5000/profile?user_id=${currentUser.user_id}`)
        const data = await respone.json();
        setIfData(true);
        let tempArray = [];
        let tempObj = {};
            for (let item in userData) {
                tempArray.push({ title: item, body: userData[item], type: getType(item) })
            }
            for (let item in userData) {
                tempObj[item] = userData[item]
            }
         setUserData(data[0])
        setDraw(tempArray)
        setProfileInfo(tempObj)
    }
    const submitButton = () => {
        setFlag(!flag)
        edit();
    }

    const getType = (item) => {
        switch (item) {
            case "name":
                return 'text';
            case 'email':
                return 'email';
            case 'age':
                return 'number';
            case 'creditCard':
                return 'number';
            case 'genre':
                return 'text';
            case 'Account_expiration_date':
                return 'date';
            default:
                return 'text';
        }

    }
    
    const edit = async () => {
        const response = await fetch(`http://localhost:5000/profile/edit?user_id=${currentUser.user_id}`, {
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
                genre: profileInfo.favorite_genre,
                Account_expiration_date: profileInfo.Account_expiration_date
            })
        });
        let data = await response.json();
        if (data) {
            alert('Updated!')
            window.location.reload();
            localStorage.setItem("userOnline", JSON.stringify({name: profileInfo.name, user_id: currentUser.user_id, is_admin: currentUser.is_admin}));
            setCurrentUser(prev => ({...prev, name: profileInfo.name, user_id: prev.user_id, is_admin: prev.is_admin}));
            return;
        } else {
            alert('Something went wrong please try again')
        }
    }
    return (
        <>
            <NavComponent />
            <h1>Hello {currentUser.name} Im your Profile</h1>
            <h3>And this is your info, you can see and edit it! </h3>
            {draw?.map((item, index) => {
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
                        <form key={index}>
                            <p>
                                <b>{item.title}:</b>{item.body}
                                <input name={`${item.title}`} value={profileInfo[item.title]} 
                                style={flag ? { display: "block" } : { display: "none" }} 
                                onChange={handleChange} type={item.type} id={item.title} required />
                            </p>
                        </form>);
                }
            })}
            <button onClick={() => setFlag(!flag)}>edit</button>
            <button style={flag ? { display: "block" } : { display: "none" }} onClick={submitButton}>Change!</button>
            <h2>Would you like to extend your subscription?</h2>
            <input onChange={handleChange} type='date' id={'Account_expiration_date'} required />
            <button onClick={edit}>Extend now!</button>
        </>
    )
}

export default ShowInfo;