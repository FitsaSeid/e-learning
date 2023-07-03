import { LaptopOutlined, NotificationOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Question from '../pages/Question';
import evangadi_new_logo from '../assets/image/evangadi_new_logo.png';
import { Footer } from 'antd/es/layout/layout';
import ReactSwitch from 'react-switch'
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Switch from '../components/Switch';

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const Sidebar = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '45px',
                    position: 'fixed', zIndex: 99999, width: '100%'
                }}
            >
                <Link to='/dashboard'>
                    <img style={{
                        width: "145px",
                        height: '20px',
                        display: "flex", justifyContent: "center", alignItems: "center"
                    }} src={evangadi_new_logo} alt="Evangadi Logo" />
                </Link>
                <div style={{ marginLeft: 'auto', width: "auto", }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BellOutlined style={{ color: "#fff", fontSize: "20px", margin: "0 20px" }} />
                        <UserOutlined style={{ color: "#fff", fontSize: "20px", marginRight: "20px" }} />
                        <Switch />
                    </div>
                </div>

            </Header>
            <Layout
                hasSider
                style={{
                    marginTop: "45px"
                }}
            >
                <Sider
                    width={200}
                    breakpoint="lg"
                    collapsible
                    onCollapse={(value) => setCollapsed(value)}
                    collapsed={collapsed}
                    collapsedWidth={50}
                    onBreakpoint={(broken) => {
                        if (broken)
                            setCollapsed(true);
                        else
                            setCollapsed(false);
                    }}
                    style={{
                        overflow: 'auto',
                        position: 'fixed',
                        background: colorBgContainer,
                        minHeight: '100vh',
                        zIndex: 999
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: window.innerWidth < 992 ? '0 0 0 10px ' : '0 24px 24px',
                        overflow: 'initial',
                        marginLeft: collapsed ? 50 : !collapsed && window.innerWidth < 992 ? 50 : 200,
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: window.innerWidth < 992 ? 0 : 20,
                            minHeight: '100vh',
                            margin: window.innerWidth < 992 ? '0 10px 0 0' : '24px 16px 0',
                            background: colorBgContainer,
                            overflow: 'initial',
                        }}
                    >
                        <Routes >
                            <Route path='/question' element={<Question />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
            <Footer
                style={{
                    textAlign: 'center',
                }}>
                Evangadi Networks ©2023 Created by Fitsum Seid
            </Footer>
        </Layout>
    );
};

export default Sidebar;
