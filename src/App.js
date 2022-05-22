import React, { Component, useState, useEffect } from 'react';
import Home from './Pages/Home';
import './App.css';
import Login from './Pages/Login';

const App = () => {

  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(JSON.parse(localStorage.getItem('is-logged')))
  }, [setLoggedIn])

  return (
    <>
      {LoggedIn ? <Home setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn}/>}
    </>
  )
}

export default App;
