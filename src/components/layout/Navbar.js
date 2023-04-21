import React, {useContext} from 'react';
import {UserContext} from "../../usercontext/UserContext";
import SignedInMenu from "./SignInMenu";
import SignOutMenu from "./SignOutMenu";
import '../../assets/css/navbar.css'
import {logOut} from "../../functions";

const Navbar = () => {
    const {user, setUser} = useContext(UserContext)

    const logout = async(e)=> {
        e.preventDefault();
        try {

           await logOut();
            if (typeof window !== "undefined") {
               sessionStorage.clear();
            }

            setUser(null);
        }catch(error) {

        }
    }
    const menu = user ? <SignedInMenu logout={logout} /> : <SignOutMenu/>;
    return (
        <React.Fragment>
            <nav color='green'>
                <div className="nav-wrapper">
                    <a href="/" className="site-logo">Site</a>
                    <ul className="main-menu">
                        {menu}
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;