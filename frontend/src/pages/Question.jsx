import React from 'react';
import styled from 'styled-components';
import { Input, Radio, Space } from 'antd';
import { useState } from 'react';
import ReactSwitch from 'react-switch';
import { LaptopOutlined, NotificationOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useSelector } from 'react-redux';
import { useGetAllMCQuestionsQuery } from '../api/endpoints/questionApiSlice';
const Question = () => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const { data: questions } = useGetAllMCQuestionsQuery();
    console.log(questions)
    const { theme } = useSelector(state => state.theme)
    return (
        <Wrapper>
            <div id={theme} className='question__container'>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing elit.</h3>
                <div className="question">
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Option A</Radio>
                            <Radio value={2}>Option B</Radio>
                            <Radio value={3}>Option C</Radio>
                            <Radio value={4}>Option D</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </Wrapper>


    );
}


const Wrapper = styled.div`
    .question__container {
        background-color: #f9fbfb;
        padding: 30px;
        margin: 20px;
        border-radius: 15px;
    }

    #light h3 {
    color: #111;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 1rem;
    }

    #dark h3 {
        color: #111;
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 1rem;
    }
`
export default Question;
