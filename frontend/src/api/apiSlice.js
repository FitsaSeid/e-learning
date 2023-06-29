import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token)
            headers.set('authorization', `Bearer ${token}`);
        return headers;
    }
})

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        const newToken = await baseQuery('/refresh', api, extraOptions);
        if (newToken) {
            api.dispatch(setCredentials({ token: newToken?.data?.accessToken }));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}

const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: builder => ({})
})

export default apiSlice;