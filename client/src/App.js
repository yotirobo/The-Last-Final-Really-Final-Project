import React from 'react';
import './App.css';
import { Route, Routes } from 'react-dom/client';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/sdarot" element={<Sdarot />} />
        <Route exact path="/sratim" element={<Sratim />} />
        <Route exact path="/videoplayer" element={<VideoPlayer />} />
        <Route exact path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
