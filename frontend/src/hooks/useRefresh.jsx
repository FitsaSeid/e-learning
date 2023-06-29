import React from 'react';
import BASE_URL from '../url/url';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

const UseRefresh = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const res = await BASE_URL.get('/api/refresh', {
            withCredentials: true
        })
        console.log("RES: " + res)
        dispatch(setCredentials({ token: res?.data?.accessToken }))
    }
    return refresh
}

export default UseRefresh;
