import { useEffect, useState } from "react";
import { useGetAllMCQuestionsQuery, useLazyGetAllMCQuestionsQuery } from "../api/endpoints/questionApiSlice";

const UseGetQuestion = () => {
    const { data: questions, isLoading } = useGetAllMCQuestionsQuery();

    const getQuestion = (q_num = 1) => {
        if (!isLoading)
            return questions[q_num];
    }
    return getQuestion;
}

export default UseGetQuestion;
