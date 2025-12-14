import { Navigate, Outlet } from 'react-router-dom'

import Header from '../../components/header'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import React from 'react'
import memoryUtils from '../../utils/memoryUtils'

/**
 * 
 * @returns 后台管理系统路由组件
 */

const { Footer, Sider, Content } = Layout;

export default function Admin() {
    const user = memoryUtils.user;
    console.log('Admin render()', user);
    if (!user || !user._id) { // 如果内存中没有存储user ==> 当前没有登录
        return <Navigate to='/login' replace /> // 自动跳转到登录(在render中)
    } else {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ margin: 20, backgroundColor: '#fff' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#ccc' }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
