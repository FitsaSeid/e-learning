import apiSlice from "../apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        signUp: builder.mutation({
            query: credentials => ({
                url: '/api/signUp',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refreshToken: builder.query({
            query: () => ({
                url: '/api/refresh',
                method: 'GET',
            })
        })
    })
})

export const { useLoginMutation, useSignUpMutation, useRefreshTokenQuery } = authApiSlice;