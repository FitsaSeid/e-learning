import apiSlice from '../apiSlice'
const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllMCQuestions: builder.query({
            query: () => ({
                url: 'api/question/mcq'
            })
        })
    })
})

export const { useGetAllMCQuestionsQuery } = questionApiSlice;