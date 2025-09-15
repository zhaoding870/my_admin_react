import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import {
    UserOutlined,
    UnorderedListOutlined,
    ProductOutlined,
    ToolOutlined,
    HomeOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'

import { Menu } from 'antd'

import './index.less'

import logo from '../../assets/images/logo.png'

/**
 * 
 * @returns 左侧导航组件
 */
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<Link to='/home'>首页</Link>, 'home', <HomeOutlined />),
    getItem('商品', 'product-sub', <ProductOutlined />, [
        getItem(<Link to='/category'>品类管理</Link>, 'category', <UnorderedListOutlined />),
        getItem(<Link to='/product'>商品管理</Link>, 'product', <ToolOutlined />)
    ]),
    getItem(<Link to='/user'>用户管理</Link>, 'user', <UserOutlined />),
    getItem(<Link to='/role'>角色管理</Link>, 'role', <SafetyCertificateOutlined />),
    getItem('图形图表', 'charts', <AreaChartOutlined />, [
        getItem(<Link to='/charts/bar'>柱形图</Link>, 'bar', <BarChartOutlined />),
        getItem(<Link to='/charts/line'>折线图</Link>, 'line', <LineChartOutlined />),
        getItem(<Link to='/charts/pie'>饼图</Link>, 'pie', <PieChartOutlined />)
    ])
];
export default function LeftNav() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        const path = location.pathname;

        // 路由 → 菜单 key 映射
        const pathToKeyMap = {
            '/home': 'home',
            '/category': 'category',
            '/product': 'product',
            '/user': 'user',
            '/role': 'role',
            '/charts/bar': 'bar',
            '/charts/line': 'line',
            '/charts/pie': 'pie',
        };

        const key = pathToKeyMap[path];
        setSelectedKeys([key]);

        // 自动展开父级菜单
        const parentMap = {
            category: 'product-sub',
            product: 'product-sub',
            bar: 'charts',
            line: 'charts',
            pie: 'charts',
        };

        const parentKey = parentMap[key];
        setOpenKeys(parentKey ? [parentKey] : []);
    }, [location.pathname]);
    return (
        <div className='left-nav'>
            <Link to="/" className='left-nav-header'>
                <img src={logo} alt="logo" />
                <h1>商城后台</h1>
            </Link>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys)}
            />
        </div>
    )
}
