import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';

const RequireAuth = () => {
    const { token } = useSelector(state => state.auth)
    console.log("RA >> " + token)
    return !token ? <Home /> : <Outlet />;
}

export default RequireAuth;
