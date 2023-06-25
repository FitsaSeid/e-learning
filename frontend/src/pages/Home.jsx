import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';

const Home = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <div className="home">
                    <div className="home__col1">
                        <div className="home_title">
                            <h3 >Evangadi say's</h3>

                            <h1>"Practice Will <span>Makes You</span> <span>Perfect"</span></h1>
                        </div>
                    </div>
                    <div className="home__col2">

                        <div className="form__container">
                            <h1 className='sign__up'>Create an Account</h1>

                            <form action="">
                                <div className="form__row1">
                                    <input type="text" name="first_name" id="first_name" placeholder='Enter first name' />

                                    <input type="text" name="last_name" id="last_name" placeholder='Enter last name' />
                                </div>

                                <input type="email" name="email" id="email" placeholder='Enter email' />

                                <div className="form__row2">
                                    <input type="text" name="password" id="password" placeholder='Enter password' />
                                    <input type="text" name="confirm_password" id="confirm_password" placeholder='Confirm password' />
                                </div>

                                <button>Create an account</button>
                                <button>Already have account?</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Wrapper>
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

    .sign__up {
        font-size: 24px;
        margin-bottom: 50px;
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
        width: 40%;
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
        width: 100%;
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

    form {
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

    input[type=text], input[type=email] {
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
