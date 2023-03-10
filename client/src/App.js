import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import Profile from './component/Profile';
import Sratim from './component/Sratim';
import Sdarot from './component/Sdarot';
import Admin from './component/Admin';
import VideoPlayer from './component/VideoPlayer';
// import Tracking from './component/Tracking';

function App() {
  const [cookieExist, setCookieExist] = useState(false);
  // console.log("cookieExist", cookieExist)
  console.log("app");
  if (document.cookie) {
    console.log('here1')
    return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage setCookieExist={setCookieExist} />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/movies" element={<Sratim />} />
          <Route exact path="/TVshows" element={<Sdarot />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/videoPlayer" element={<VideoPlayer />} />
          {/* <Route exact path="/tracking" element={<Tracking />} /> */}
        </Routes>
      </>
    );
  }
  else {
    console.log('here2')

    return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage  setCookieExist={setCookieExist}/>} />
        </Routes>
      </>
    )
  }
}

export default App;
