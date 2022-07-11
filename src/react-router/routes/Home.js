import React from 'react'; 
import { Link, Outlet } from 'react-router-dom';

const Home = props => {
    return(
        <div>
            <h5>Home page</h5>
            <Outlet/>
        </div>
    )} 
export default Home;