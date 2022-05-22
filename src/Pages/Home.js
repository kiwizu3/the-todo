import React from 'react';
import List from './List';
import NavBar from './NavBar';

const Home = ({setLoggedIn}) => {
    return (
        <>
            <NavBar setLoggedIn={setLoggedIn}/>
            <List />
        </>
    )
}
export default Home;