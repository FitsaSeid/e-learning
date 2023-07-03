import apiSlice from '../apiSlice'
const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllMCQuestions: builder.query({
            query: () => ({
                url: 'api/question/mcq'
            })
        }),
        verifyQuestion: builder.mutation({
            query: ({ question_id, answer }) => ({
                url: `api/verify-answer/${question_id}`,
                method: 'POST',
                body: { ...answer }
            })
        })
    })
})

export const { useLazyGetAllMCQuestionsQuery, useGetAllMCQuestionsQuery, useVerifyQuestionMutation } = questionApiSlice;