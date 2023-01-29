import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('signUp')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [subscirbeTime, setSubscribeTime] = useState('');
  const [janer, setJaner] = useState('');

  async function logInCheck(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    let data = await response.json();
    console.log(data);
    if (data) {
        const respone = await fetch(`http://localhost:5000/users?user=${username}`)
        const data = await respone.json();
        localStorage.setItem('userOnline', JSON.stringify({username : username, user_id : data.user_id}));
        navigate("/profile")
    } else {
        navigate('/')
        alert('username or password are incorrect')
    }
}
async function register(e) {
  e.preventDefault()
  const response = await fetch('http://localhost:5000/users/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          age: age,
          creditCard: creditCard,
          janer: janer,
          subscirbeTimem : subscirbeTime
      })
  });
  let data = await response.json();
  console.log(data)
  if (data) {
      window.location.reload() // goes to login
      return;
  } else {
      alert('There is a problem with one of the fields, Please refill and try again.')
      navigate('/')
  }
}

  const handleChangePassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  }
  const handleChangeUsername = e => {
    e.preventDefault();
    setUsername(e.target.value);
  }
  const handleChangeEmail = e => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  const handleChangeAge = e => {
    e.preventDefault();
    setAge(e.target.value);
  }
  const handleChangeCreditCard = e => {
    e.preventDefault();
    setCreditCard(e.target.value);
  }
  const handleChangeSubscriptionTime = e => {
    e.preventDefault();
    setSubscribeTime(e.target.value);
  }
  const handleChangeJaner = e => {
    e.preventDefault();
    setJaner(e.target.value);
  }


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
                  <input onChange={handleChangeUsername} type="text" id="username" placeholder="Please insert Username" required />
                </li>
                <li>
                  <input onChange={handleChangeEmail} type="email" id="email" placeholder='Please insert your Email' required />
                </li>
                <li>
                  <input onChange={handleChangePassword} type="password" id="password" placeholder="Please insert a Password" required />
                </li>
                <li>
                  <input onChange={handleChangeAge} type="number" id="age" placeholder="Please insert your Age" required />
                </li>
                <li>
                  <input onChange={handleChangeJaner} type="text" id="janer" placeholder="Please insert your favourite janer" required />
                </li>
                <li>
                  <input onChange={handleChangeCreditCard} type="number" id="creditCard" placeholder="Please insert your credit card" required />
                </li>
                <li>
                  <label for="subscirbeTime">Choose your subscription time</label>
                  <br />
                  <input onChange={handleChangeSubscriptionTime} type="time" id="subscirbeTime" required />
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
                  <input onChange={handleChangeUsername} type="text" id="username" placeholder="Please insert Username" required />
                </li>
                <li>
                  <input onChange={handleChangePassword} type="password" id="password" placeholder="Please insert a Password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => setCurrentView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </form>
            <button oncClick={logInCheck}>Login</button>
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
                  <input type="email" id="email" required />
                </li>
              </ul>
            </form>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => this.changeView("logIn")}>Go Back</button>
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