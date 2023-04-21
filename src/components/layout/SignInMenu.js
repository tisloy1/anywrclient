import React from 'react';

const SignedInMenu = ({logout}) => {
    return (
        <>
            <li><a href={'/profile/'+sessionStorage.getItem('user_id')}>Profile</a></li>
            <li onClick={logout}><a href="#">Logout</a></li>
        </>

    );
};

export default SignedInMenu;