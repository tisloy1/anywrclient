import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../usercontext/UserContext";
import {Navigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import {getUser} from "../functions";
import '../assets/css/profile.css'

const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const [username, setUsername] = useState('');
    let { id } = useParams();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUser(id);

                setUser(response.email);
                setUsername(response.username);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();

    }, [id]);

    if(!user){
        return <Navigate to="/login" />
    }
    return (
        <div className="row profile-page">
            <span className="card-title">Mon email : {user ? user : ''}</span>
            <span className="card-title">Mon username : {username ? username : ''}</span>
        </div>
    );
};

export default Profile;