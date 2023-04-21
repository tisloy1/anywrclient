import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {UserContext} from './usercontext/UserContext';
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import './App.css'
import Signup from "./components/auth/Signup";
import {verifyUser} from "./functions";
import Profile from "./pages/Profile";

function App() {
    const [user, setUser] = useState(sessionStorage.getItem('user') ? sessionStorage.getItem('user')  : null);
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        const verifyuser = async () => {
            setIsloading(true);
            try {

                const response = await verifyUser();

                if(response.user) {
                    setUser(response.user);
                }

            } catch (error) {
                console.log(error)
            }
            setIsloading(false);


        }
        verifyuser();
    }, [])

    return (
        <Router>
            <div className="App">
                <UserContext.Provider value={{user, setUser}}>
                    {
                        isloading ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                </div>
                            </div> :
                            <>
                                <Navbar/>
                                <Routes>
                                    <Route exact path="/" element={<Home/>}/>
                                    <Route exact path="/login" element={<Login/>}/>
                                    <Route exact path="/signup" element={<Signup/>}/>
                                    <Route exact path="/profile/:id" element={<Profile/>}/>
                                </Routes>
                            </>

                    }

                </UserContext.Provider>

            </div>
        </Router>

    );
}

export default App;
