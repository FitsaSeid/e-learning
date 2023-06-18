import apiSlice from "../apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginRequest: builder.mutation({
            query: credentials => ({
                url: '/api/signin',
                method: 'POST',
                body: { credentials }
            })
        })
    })
})

export const { useLoginRequestMutation } = authApiSlice;