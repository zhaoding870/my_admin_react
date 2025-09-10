/**
 * 能发送 ajax 请求的函数模块
 * 函数的返回值是 promise
 * 
 * axios 库：专门用来发送 ajax 请求的 第三方库
 * axios 的使用：
 * 1. 下载：npm install axios --save
 * 2. 引入：import axios from 'axios'
 * 3. 发送 ajax 请求
 *  axios.get(url[, config])   发 GET 请求
 * axios.post(url[, data[, config]]) 发 POST 请求
 * 4. axios 返回的就是 promise 对象
 * 5. axios 发请求时，如果请求成功了，调用 promise 的 resolve()，并把响应数据传递出去
 *    如果请求失败了，调用 promise 的 reject(), 并把错误信息传递出去
 * 
 * 注意：axios 发请求时，不需要自己创建 XMLHttpRequest 对象，也不需要自己去解析 JSON 数据
 *    axios 自动帮我们做了这些
 *  axios 默认返回的数据就是 JSON 对象，不需要自己手动转换
 *  6. axios 发请求时，传递参数：params/query/data
 *   GET 传参：把参数放在 url 地址后面，以 ?name=value&name=value 的形式传递
 *  也可以通过配置对象的 params 属性来传递
 *  
 * POST 传参：把参数放在请求体中传递    
 *  可以通过配置对象的 data 属性来传递
 * 7. axios 发请求时，配置对象
 *  GET 请求：axios.get(url, {params: {name: value}})
 * POST 请求：axios.post(url, data)
 * 8. axios 发请求时，如何设置请求头
 * 可以通过配置对象的 headers 属性来设置请求头
 * 9. 取消请求
 * 10. 设置请求超时：timeout 属性   
 * 11. 发送并发请求：axios.all([promise1, promise2])
 *   .then(axios.spread((res1, res2) => {}))
 * 12. 响应数据解构
 * 13. 全局配置
 * 14. 创建 axios 实例：axios.create()
 * 15. axios 拦截器
 *  1). 请求拦截器：axios.interceptors.request.use()
 *  2). 响应拦截器：axios.interceptors.response.use()
 * 16. 更多请参考文档：http://www.axios-js.com/zh-cn/docs/
 *  
 * 返回自己创建的 promise对象（包装了 axios 的 promise）
 * 优点：
 * 1. 统一处理请求异常
 * 2. 异步得到的数据不是 response，而是 response.data
 */

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise // 记录请求的 promise 对象
        if (type === 'GET') { // 发 GET 请求
            // 发送 GET 请求
            promise = axios.get(url, { params: data })
        } else { // 发 POST 请求
            promise = axios.post(url, data)
        }

        promise.then(response => {
            // 成功了调用 resolve()
            resolve(response.data)
        }).catch(error => {
            // 对所有的异常进行统一处理
            // 失败了调用 reject()
            reject(error)
            message.error('请求出错了: ' + error.message)
        })
    })
}   