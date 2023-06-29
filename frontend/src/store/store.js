import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import apiSlice from '../api/apiSlice';
import themeSlice from '../features/themeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store