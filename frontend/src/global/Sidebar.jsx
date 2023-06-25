import { LaptopOutlined, NotificationOutlined, UserOutlined, AppstoreAddOutlined, BellOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import evangadi_new_logo from '../assets/image/evangadi_new_logo.png';
import { Footer } from 'antd/es/layout/layout';
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

const item3 = [
    {
        key: 1,
        icon: React.createElement(AppstoreAddOutlined),
        label: `Dashboard`,
        // children: [
        //     {
        //         key: 33,
        //         icon: React.createElement(AppstoreAddOutlined),
        //         label: `option1`,
        //     },
        //     {
        //         key: 4,
        //         label: `option2`,
        //     }
        // ]
    },
    {
        key: 2,
        icon: React.createElement(NotificationOutlined),
        label: `Phase 1 `,
        children: [
            {
                key: 33,
                label: `option1`,
            },
            {
                key: 4,
                label: `option2`,
            }
        ]
    },
    {
        key: 3,
        icon: React.createElement(UserOutlined),
        label: `Phase 2 `,
        children: [
            {
                key: 5,
                label: `option1`,
            },
            {
                key: 6,
                label: `option2`,
            }
        ]
    },
    {
        key: 4,
        icon: React.createElement(UserOutlined),
        label: `Phase 3 `,
        children: [
            {
                key: 5,
                label: `option1`,
            },
            {
                key: 6,
                label: `option2`,
            }
        ]
    }
]
const Sidebar = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '45px',
                    backgroundColor: "#002140"
                }}

            >
                <img style={{
                    width: "145px",
                    height: '20px',
                    display: "flex", justifyContent: "center", alignItems: "center"
                }} src={evangadi_new_logo} alt="Evangadi Logo" />

                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}

                <div style={{ marginLeft: 'auto', width: "auto", }}>

                    <div >
                        <BellOutlined style={{ color: "#fff", fontSize: "20px", margin: "0 20px" }} />
                        <UserOutlined style={{ color: "#fff", fontSize: "20px" }} />

                    </div>
                </div>

            </Header>
            <Layout>
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
                        background: colorBgContainer,
                        position: window.innerWidth < 620 && "absolute", height: "100vh"
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            margin: '30px 0',
                            fontSize: "16px"
                        }}
                        items={item3}
                    />
                </Sider>


                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        Content
                    </Content>

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Evangadi Networks ©2023 Created by Fitsum Seid
                    </Footer>
                </Layout>
            </Layout>
        </Layout >
    );
};
export default Sidebar;