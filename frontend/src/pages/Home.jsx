import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { message, Button } from 'antd';
import { LoadingOutlined, NotificationOutlined } from '@ant-design/icons';
import { useLoginMutation, useSignUpMutation } from '../api/endpoints/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../features/authSlice';
const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const { token } = useSelector(state => state.auth);
    const [signUp] = useSignUpMutation();
    const [login] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token)
            navigate(-1)
    }, [])

    const [credentials, setCredential] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    })

    const inputHandler = (e) => {
        setCredential({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const loginInputHandler = (e) => {
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (credentials.password !== credentials.confirm_password)
                return message.error('Please confirm your password correctly');

            const { firstName, lastName, email, password } = credentials;
            const res = await signUp({ firstName, lastName, email, password }).unwrap();

            if (res) {
                setIsLoading(false);
                dispatch(setCredentials({ token: res.accessToken, firstName: res.firstName }))
                navigate('/dashboard', { replace: true })
            }
        } catch (error) {
            setIsLoading(false);
            message.error(error?.data?.message)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await login(loginInput).unwrap();
            setIsLoading(false);
            if (res) {
                setIsLoading(false);
                dispatch(setCredentials({ token: res.accessToken, firstName: res.firstName }))
                navigate('/dashboard')
            }
        } catch (error) {
            setIsLoading(false);
            message.error(error?.data?.message)
        }
    }
    return (
        <>
            <Header />
            {
                token ? <h1>Redirecting...</h1> :
                    <Wrapper>
                        <div className="home">
                            <div className="home__col1">
                                <div className="home_title">
                                    <h3 >Evangadi say's</h3>

                                    <h1>"Practice Will <span>Makes You</span> <span>Perfect"</span></h1>
                                </div>
                            </div>
                            <div className="home__col2">

                                {
                                    isSignUp
                                        ? <div className="form__container">
                                            <h1 className='sign__up'>Create an Account</h1>

                                            <form action="" onSubmit={handleSubmit}>
                                                <div className="form__row1">
                                                    <input type="text"
                                                        name="firstName"
                                                        id="firstName"
                                                        placeholder='Enter first name'
                                                        onChange={inputHandler}
                                                    />

                                                    <input type="text"
                                                        name="lastName"
                                                        id="lastName"
                                                        placeholder='Enter last name'
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <input type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder='Enter email'
                                                    onChange={inputHandler}
                                                />

                                                <div className="form__row2">
                                                    <input type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder='Enter password'
                                                        onChange={inputHandler}
                                                    />

                                                    <input type="password"
                                                        name="confirm_password"
                                                        id="confirm_password"
                                                        placeholder='Confirm password'
                                                        onChange={inputHandler}
                                                    />
                                                </div>

                                                <button type='submit'> {isLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Create an Account"} </button>
                                                <button type='button' className='login'
                                                    onClick={() => {
                                                        setIsSignUp(false)
                                                    }}
                                                > Already have account?</button>
                                            </form>
                                        </div> :

                                        <div className="form__container">
                                            <h1 className='sign__in'>Login to Account</h1>

                                            <form action="" onSubmit={handleLogin} className='sign__in__form'>

                                                <input type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder='Enter email'
                                                    onChange={loginInputHandler}
                                                />

                                                <input type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder='Enter password'
                                                    onChange={loginInputHandler}
                                                />

                                                <button type='submit'> {isLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "LogIn"} </button> <br />
                                                <button type='button' className='login'
                                                    onClick={() => {
                                                        setIsSignUp(true)
                                                    }}
                                                > Create an account</button>
                                            </form>
                                        </div>
                                }
                            </div>
                        </div>
                    </Wrapper>
            }

        </>
    );
}


const Wrapper = styled.div`

    .home {
        display: flex;
        min-height: 100vh;
    }

    h3 {
        text-align: left;
    }

    .sign__up, .sign__in {
        font-size: 24px;
        margin-bottom: 50px;
    }

    .sign__in__form input {
        width: 95%;
        
    }
    h1, span {
        font-size: 100px;
        color: #fff;
        line-height: 110%;
    }

    h1 {
        color: #becb0a;
    }

    .home__col1 {
        width: 50%;
        background-color: #161515;
    }
    .home__col2 {
        width: 50%;
        margin: 0 auto;
    }

    .form__row1, .form__row2 {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .home__col2 {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 100px;
    }
    .home_title {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 100px;
    }

    .form__container {
        width: 80%;
        height: 700px;
        background-color: #fff;
        box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 150px;
    }

    form, .sign__in__form{
       margin: 0 auto;
       width: 90%;
    }

    input { 
        padding: 12px 0;
        width: 45%;
        margin: 15px 0;
        border-radius: 3px; 
        border: 1px solid rgba(0, 0, 0, 0.4);
        background-color: #fff;
        font-size: 16px;
        color: "#111"
    }

    input[type=text], input[type=email], input[type=password] {
        color: #111;
        padding-left: 20px;
    }

    input::placeholder {
        color: rgba(0, 0, 0, 0.4);;
        padding: 20px;
    }
    button {
        width: 100%;
        margin-top: 15px;
        padding: 15px;
        background-color: #becb0a;
        border: 1px solid;
        cursor: pointer;
    }

    .login {
        width: 100%;
        margin-top: 15px;
        padding: 15px;
        background-color: transparent;
        color: #becb0a;
        border: 1px solid;
        border: 2px solid #becb0a;
        cursor: pointer;
    }
    @media (max-width: 1280px) {

        h1, span {
            font-size: 70px;
        }

        .home_title {
            margin: 0 20px;
        }
        .home__col2 {
            width: 60%;
        }
        .home__col1 {
            width: 40%;
        }
        .form__container {
            margin-top: 150px;
        }
    }

    @media (max-width: 1660px) {
        h1, span {
            font-size: 80px;
        }
        .home__col2 {
            width: 100%;
        }
        .form__container {
            margin-top: 150px;
        }
    }


    @media (max-width: 1100px) {
        .form__container {
            margin-top: 100px;
        }

        .home {
            flex-wrap: wrap;
        }
        .home__col1 {
            display: none;
        }
        .home__col2{
            width: 100%;
        }
        form {
            width: 90%;
        }
    }

    @media (max-width: 615px) {
        .form__container {
            width: 320px;
            margin-top: 100px;
        }

        .home__col2 {
            margin: 0 10px;
        }

        .form__row1, .form__row2 {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex-wrap: wrap;
        }

        input {
            width: 100%;
        }

        .sign__up {
            font-size: 20px;
        }
    }

`
export default Home;
