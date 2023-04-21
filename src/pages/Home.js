import React, {useContext}  from 'react';
import {UserContext} from '../usercontext/UserContext';
import {Navigate} from "react-router-dom";
import '../assets/css/home.css'

const Home = () => {
    const {user, setUser} = useContext(UserContext);


    if(!user){
        return <Navigate to="/login" />
    }
    return (
        <div className="row home-page">
            <span className="card-title">Welcome {user ? user : ''}</span>
        </div>
    );
};

export default Home;