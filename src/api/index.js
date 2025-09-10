/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */

import ajax from './ajax'

const BASE = '/api' // 基础路径

// 登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')