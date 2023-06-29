import React, { useEffect, useState } from 'react';
import useRefresh from '../hooks/useRefresh';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const PersistAuth = () => {
    const [isLoading, setIsLoading] = useState(true);

    const refresh = useRefresh();
    const { token } = useSelector(state => state.auth)
    useEffect(() => {
        const refreshT = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (!token)
            refreshT();
        else
            setIsLoading(false)
    }, [])

    return isLoading ? <h1>Loading ...</h1> : <Outlet />
}

export default PersistAuth;
