import React, { useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import evandagi from '../assets/image/evangadi.png'
const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navMenuHandler = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (

        <Wrapper>
            <a className='nav__logo' href="">
                <img src={evandagi} alt="Evangadi Logo" />
            </a>

            <ul className={isCollapsed ? 'nav_middle start' : 'nav_middle'}>
                <li> <a href="" className='active'>Home</a> </li>
                <li> <a href="">About us</a> </li>
                <li> <a href="">Help</a> </li>
            </ul>

            <div className="nav__signIn">
                <a href=""><UserOutlined style={{ marginRight: '10px' }} /> Sign In</a>
                <MenuOutlined onClick={navMenuHandler} className='nav__menu' style={{ marginLeft: '30px' }} />
            </div>
        </Wrapper >

    );
}


const Wrapper = styled.header`
        position: fixed;
        background-color: #fff;
        padding: 20px 10%;
        color: #111;
        width: 100%;
        top: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);

        .nav__logo {
            width: 250px;
            height: 35px;
        }
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
        .nav_middle, .nav__signIn {
            display: flex;
            align-items: center;
        }

        .nav_middle li {
            margin: 0 30px;
        list-style: none;
        font-weight: 600;
        }

        .nav__logo {
            margin-left: 20%;
        }
        .nav_middle a.active {
            color: #2f2f2f;
        }

        .nav__signIn a {
            display: flex;
        align-items: center;
        color: #111;
        }

        .nav__menu {
            display: none;
        }
        a{
            text-decoration: none;
        color: #111;
        }

        @media (max-width: 1280px) {
            padding: 15px 2%;
        transition: .2s; 
        }

        @media (max-width: 1100px) {
        .nav__menu {
            display: block;
        }

        .nav__logo {
            width: 150px;
            height: 35px;
        }

        .nav_middle {
            position: absolute;
        top: 100%;
        right: -100%;
        width: 200px;
        background-color: #becb0a;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        transition: all .5s ease;
        }
        .nav_middle li:first-child {
            margin: 0
        }
        .nav_middle li {
            margin: 12px 0;
        padding: 0 25px;
        transition: all .5s ease;
        }

        .nav_middle a:hover {
            color: #fff;
        }
        .start {
            right: 0%
        }
 }
            `

export default Header;
