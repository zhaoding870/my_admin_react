import React from 'react';
import { Link } from 'react-router-dom';

import {
    HomeOutlined,
    ProductOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';
const menus = [
    {
        key: 'home',
        path: '/home',
        title: '首页',
        icon: <HomeOutlined />
    },
    {
        key: 'product-sub',
        title: '商品',
        icon: <ProductOutlined />,
        children: [
            {
                key: 'category',
                path: '/category',
                title: '品类管理',
                icon: <UnorderedListOutlined />
            },
            {
                key: 'product',
                path: '/product',
                title: '商品管理',
                icon: <ToolOutlined />
            }
        ]
    },
    {
        key: 'user',
        path: '/user',
        title: '用户管理',
        icon: <UserOutlined />
    },
    {
        key: 'role',
        path: '/role',
        title: '角色管理',
        icon: <SafetyCertificateOutlined />
    },
    {
        key: 'charts',
        title: '图形图表',
        icon: <AreaChartOutlined />,
        children: [
            {
                key: 'bar',
                path: '/charts/bar',
                title: '柱形图',
                icon: <BarChartOutlined />
            },
            {
                key: 'line',
                path: '/charts/line',
                title: '折线图',
                icon: <LineChartOutlined />
            },
            {
                key: 'pie',
                path: '/charts/pie',
                title: '饼图',
                icon: <PieChartOutlined />
            }
        ]
    }
];

export function getTitle(path) {
    let title = '';

    menus.forEach(menu => {
        if (menu.path === path) {
            title = menu.title;
        } else if (menu.children) {
            const cMenu = menu.children.find(cMenu => path.indexOf(cMenu.path) === 0);
            if (cMenu) {
                title = cMenu.title;
            }
        }
    });
    return title;
}

function getItem(key, path, tltle, icon, children) {
    return {
        key,
        icon,
        children,
        label: path ? <Link to={path}>{tltle}</Link> : tltle
    };
}

export function getItems() {
    let items = [];
    menus.forEach(menu => {
        if (!menu.children) {
            items.push(
                getItem(menu.key, menu.path, menu.title, menu.icon)
            );
        } else {
            let cItems = [];
            menu.children.forEach(cMenu => {
                cItems.push(getItem(cMenu.key, cMenu.path, cMenu.title, cMenu.icon));
            });
            items.push(getItem(menu.key, null, menu.title, menu.icon, cItems));
        }
    });
    return items;
}
