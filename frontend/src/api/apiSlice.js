import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: true,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token)
            headers.set('authorization', `Bearer ${token}`);
        return headers;
    }
})

const baseQueryWithRefreshToken = async (api, args, extraOptions) => {
    const result = await baseQuery(api, args, extraOptions);

    if (result?.error) {
        const newToken = await baseQuery('/refresh', args, extraOptions);
        if (newToken) {
            api.dispatch(setCredentials({ token: newToken?.data?.accessToken }));
            newToken = await baseQuery('/refresh', args, extraOptions);
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