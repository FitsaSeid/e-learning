import React from 'react';
import styled from 'styled-components';
import { Radio, Space } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllMCQuestionsQuery, useVerifyQuestionMutation } from '../api/endpoints/questionApiSlice';

const Question = () => {
    const [value, setValue] = useState(1);
    // const [question, setQuestion] = useState({});
    const [questionNumber, setQuestionNumber] = useState(0);
    const [verifyQuestion] = useVerifyQuestionMutation();

    const { data: question, isLoading } = useGetAllMCQuestionsQuery();
    // setQuestion(data);
    const { theme } = useSelector(state => state.theme)
    const [result, setResult] = useState('');

    const verifyAnswer = async (e, question_id) => {
        console.log(e.target.value)
        try {
            const result = await verifyQuestion({ question_id, answer: { answer: e.target.value } });
            setResult(result?.data?.message);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Wrapper>
            {
                isLoading ? <h1>Loading...</h1> :
                    <div id={theme} className='question__container'>
                        <h3>{question[questionNumber].question}</h3>
                        <div className="question">
                            <Radio.Group onChange={(e) => {
                                verifyAnswer(e, question[questionNumber]._id);
                            }} >
                                <Space direction="vertical">
                                    <Radio value="a">{question[questionNumber]?.choice?.a}</Radio>
                                    <Radio value="b">{question[questionNumber]?.choice?.b}</Radio>
                                    <Radio value="c">{question[questionNumber]?.choice?.c}</Radio>
                                    <Radio value="d">{question[questionNumber]?.choice?.d}</Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                        <div className="controllers">
                            <button
                                disabled={questionNumber <= 0}
                                onClick={() => { setQuestionNumber(questionNumber - 1) }}
                            >Previous</button>
                            <button
                                onClick={() => { setQuestionNumber(questionNumber + 1) }}
                                disabled={questionNumber + 1 >= question.length}
                            >Next</button>
                        </div>

                    </div>
            }

            {
                result == 'Correct' ? <h1>Correct</h1> : <h1>Incorrect</h1>
            }
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
        height: 50vh;
        border-radius: 15px;
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
export default Question;
