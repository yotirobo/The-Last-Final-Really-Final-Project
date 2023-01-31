import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  console.log('props.setCookieExist', props.setCookieExist)
  const setCookieExist = props.setCookieExist
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('signUp')
  const [userInfo, setUserInfo] = useState({
    name: '',
    password: '',
    email: '',
    age: Number,
    creditCard: Number,
    Account_expiration_date: Date,
    genre: '',
  })

  async function logInCheck(e) {
    e.preventDefault();
    console.log(userInfo.name);
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        password: userInfo.password,
      })
    });
    let data = await response.json();
    console.log(data);
    if (data) {
      const responseForUserID = await fetch(`http://localhost:5000/users/user?name=${userInfo.name}`)
      const data = await responseForUserID.json();
      localStorage.setItem('userOnline', JSON.stringify({ name: userInfo.name, user_id: data[0].user_id }));
      setCookie(userInfo.name, 1)
      console.log(typeof setCookieExist, 'reut')
      setCookieExist(true)
      navigate("/profile")
    } else {
      alert('name or password are incorrect')
    }
  }
  async function register(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        password: userInfo.password,
        email: userInfo.email,
        age: userInfo.age,
        creditCard: userInfo.creditCard,
        genre: userInfo.genre,
        Account_expiration_date: userInfo.Account_expiration_date,
        is_admin: 0
      })
    });
    let data = await response.json();
    console.log(data)
    if (data) {
      setCurrentView("logIn")// goes to login
      return;
    } else {
      alert('There is a problem with one of the fields, Please refill and try again.')
      navigate('/')
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value
    })
  };


  const CurrentView = () => {
    switch (currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <form>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <input onChange={handleChange} type="text" id="name" placeholder="Please insert name" required />
                </li>
                <li>
                  <input onChange={handleChange} type="email" id="email" placeholder='Please insert your Email' required />
                </li>
                <li>
                  <input onChange={handleChange} type="password" id="password" placeholder="Please insert a Password" required />
                </li>
                <li>
                  <input onChange={handleChange} type="number" id="age" placeholder="Please insert your Age" required />
                </li>
                <li>
                  <label for="genre">Choose your favorot:</label>
                  <select name="genre" id="genre">
                    <option value="Animated">Animated</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Drama">Drama</option>
                  </select>
                </li>
                <li>
                  <input onChange={handleChange} type="number" id="creditCard" placeholder="Please insert your credit card" required />
                </li>
                <li>
                  <label for="Account_expiration_date">Choose your subscription time</label>
                  <br />
                  <input onChange={handleChange} type="date" id="Account_expiration_date" required />
                </li>
              </ul>
            </form>
            <button onClick={register}>Submit</button>
            <button type="button" onClick={() => setCurrentView("logIn")}>Have an Account?</button>
          </form>
        )
        break
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <form>
              <legend>Log In</legend>
              <ul>
                <li>
                  <input onChange={handleChange} type="text" id="name" placeholder="Please insert name" required />
                </li>
                <li>
                  <input onChange={handleChange} type="password" id="password" placeholder="Please insert a Password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => setCurrentView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </form>
            <button onClick={logInCheck}>Login</button>
            <button type="button" onClick={() => setCurrentView("signUp")}>Create an Account</button>
          </form>
        )
        break
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <form>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input onChange={handleChange} type="email" id="email" required />
                </li>
              </ul>
            </form>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => {
              setCurrentView("logIn")
              setCookie('username', userInfo.name, 1)
            }}>Go Back</button>
          </form>
        )
      default:
        break
    }
  }
  function setCookie(cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `username = ${cvalue};  expires =${exdays}  ;path=http://localhost:3000;`
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }

  return (
    <>
      <section id="entry-page">
        {CurrentView()}
      </section>

    </>
  )

}

export default HomePage;