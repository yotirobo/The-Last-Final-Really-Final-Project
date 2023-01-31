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
        Account_expiration_date: Number
    })

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);

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
                Account_expiration_date: profileInfo.Account_expiration_date
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
            tempArray.push({ title: item, body: userData[item], type: ()=> getType(item)})
        }
        setUserData(data[0])
        setDraw(tempArray)
        console.log(tempArray)
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
                        <form>
                            <p>
                                <b>{item.title}:</b>{item.body}
                                <input name={`${item.title}`} value={profileInfo[item.title]} style={flag ? { display: "block" } : { display: "none" }} onChange={handleChange} type={item.type} id={item.title} required />
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