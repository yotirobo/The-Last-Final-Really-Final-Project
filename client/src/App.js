import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import Profile from './component/Profile';
// import Sdarot from './component/Sdarot';
// import Sratim from './component/Sratim';
// import VideoPlayer from './component/VideoPlayer';
// import Tracking from './component/Tracking';


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* <Route exact path="/sdarot" element={<Sdarot />} />
        <Route exact path="/sratim" element={<Sratim />} />
        <Route exact path="/videoplayer" element={<VideoPlayer />} />
        <Route exact path="/tracking" element={<Tracking />} /> */}
      </Routes>
    </>
  );
}

export default App;
