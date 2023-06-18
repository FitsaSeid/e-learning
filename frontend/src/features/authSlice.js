import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        firstName: null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.firstName = action.payload.firstName;
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.firstName = null;
            state.lastName = null;
        }
    }
})

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;