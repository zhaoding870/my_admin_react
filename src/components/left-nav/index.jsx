import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'

import { getItems } from '../../utils/menuConfig'

import './index.less'

import logo from '../../assets/images/logo.png'

/**
 * 
 * @returns 左侧导航组件
 */
const items = getItems();
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
            '/product/home': 'product',
            '/product/detail': 'product',
            '/product/addupdate': 'product',
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
