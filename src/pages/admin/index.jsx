import React from 'react'

import { Navigate } from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

/**
 * 
 * @returns 后台管理系统路由组件
 */
export default function Admin() {
    const user = memoryUtils.user;
    if (!user || !user._id) { // 如果内存中没有存储user ==> 当前没有登录
        return <Navigate to='/login' replace /> // 自动跳转到登录(在render中)
    } else {
        return (
            <div>
                Hello {user.username}
            </div>
        )
    }
}
