import './index.less';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LinkButton from '../../components/link-button';
import { Modal } from 'antd';
import { formatDate } from '../../utils/dateUtils';
import { getTitle } from '../../utils/menuConfig';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

/**
 * 
 * @returns 头部组件
 */
export default function Header() {
    // 当前时间
    const [currentTime, setCurrentTime] = useState(formatDate(new Date()));
    const user = memoryUtils.user;

    // 实时更新当前时间
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const formattedTime = formatDate(now);
            setCurrentTime(formattedTime);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    // 获取当前路由路径
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname; // 或 window.location.hash 如果使用 hash 路由
    const title = getTitle(path);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        handleLogout();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function handleLogout() {
        // 删除保存的user数据
        memoryUtils.user = {};
        storageUtils.removeUser();

        // 跳转到登录界面
        navigate('/login', { replace: true });
    }

    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎, {user.username}</span>
                <LinkButton onClick={showModal}>退出</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    {title}
                </div>
                <div className='header-bottom-right'>
                    <span>{currentTime}</span>
                    &nbsp;&nbsp;
                    <span>多云</span>
                </div>
            </div>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>确定退出吗？</p>
            </Modal>
        </div>
    )
}