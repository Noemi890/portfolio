import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutMe from './Pages/AboutMe';
import Main from './Pages/Main';
import Projects from './Pages/Projects';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path='/aboutMe' element={<AboutMe />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
