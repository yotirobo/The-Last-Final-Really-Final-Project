import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('signUp')
  const[userInfo, setUserInfo] = useState({
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
        password:  userInfo.password,
      })
    });
    let data = await response.json();
    console.log(data);
    if (data) {
      const responseForUserID =  await fetch(`http://localhost:5000/users/user?name=${userInfo.name}`)
      const data = await responseForUserID.json();
      localStorage.setItem('userOnline', JSON.stringify({ name: userInfo.name, user_id:data[0].user_id}));
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
        password:  userInfo.password,
        email:  userInfo.email,
        age:  userInfo.age,
        creditCard:  userInfo.creditCard,
        genre:  userInfo.genre,
        Account_expiration_date:  userInfo.Account_expiration_date,
        is_admin : 0
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
                  <input onChange={handleChange} type="text" id="genre" placeholder="Please insert your favourite genre" required />
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
            <button type="button" onClick={() => setCurrentView("logIn")}>Go Back</button>
          </form>
        )
      default:
        break
    }
  }



  return (
    <section id="entry-page">
      {CurrentView()}
    </section>
  )

}

export default HomePage;