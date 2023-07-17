import React from 'react';
import styled from 'styled-components';
import { Radio, Space } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllMCQuestionsQuery, useVerifyQuestionMutation } from '../api/endpoints/questionApiSlice';

const Challenge = () => {

    const { data: question, isLoading } = useGetAllMCQuestionsQuery();
    // setQuestion(data);
    const { theme } = useSelector(state => state.theme)


    return (
        isLoading ? <h1>Loading ...</h1>
            : <Wrapper>
                <div id={theme} className='question__container'>
                    {
                        question?.map(question => (
                            <div className='single__question'>
                                <h3>{question?.question}</h3>
                                <div className="question">
                                    <Radio.Group onChange={(e) => {
                                        verifyAnswer(e, question._id);
                                    }} >
                                        <Space direction="vertical">
                                            <Radio value="a">{question?.choice?.a}</Radio>
                                            <Radio value="b">{question?.choice?.b}</Radio>
                                            <Radio value="c">{question?.choice?.c}</Radio>
                                            <Radio value="d">{question?.choice?.d}</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </Wrapper>
    );
}

const Wrapper = styled.div`
    font-size: 1.5rem;
    h1{color: #111}
    .question__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f4fafa;
        padding: 30px;
        margin: 20px;
        border-radius: 15px;
    }

    .single__question {
        margin: 30px;
    }
    .controllers {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    button {
        padding: 5px 30px;
        background-color: #ffc342;
        color: #111;
    }
    button:disabled {
        background-color: #f4fafa;
        cursor: not-allowed;
    }
   span {
    font-size: 1.1rem;
   }
    #light h3 {
    color: #111;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: start;
    }

    #dark h3 {
        color: #111;
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 1.5rem;
    }
`

export default Challenge;
