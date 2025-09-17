import React from 'react'

import './index.less'

/**
 * 
 * @returns 头部组件
 */
export default function Header() {
    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎, admin</span>
                <a href='javascript:'>退出</a>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    首页
                </div>
                <div className='header-bottom-right'>
                    <span>2024-06-18 11:11:11</span>
                    <img src="" alt="Weather" />
                    <span>多云</span>
                </div>
            </div>
        </div>
    )
}
