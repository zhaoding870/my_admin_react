import './index.less'

import {
    Button,
    Form,
    Input,
    message
} from 'antd'
import {
    LockOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Navigate, useNavigate } from 'react-router-dom'

import React from 'react'
import logo from '../../assets/images/logo.png'
import memoryUtils from '../../utils/memoryUtils'
import { reqLogin } from '../../api'
import storageUtils from '../../utils/storageUtils'

/**
 * 
 * @returns 登录路由组件
 */
export default function Login() {
    const navigate = useNavigate();
    const user = memoryUtils.user;
    // 如果已经登录, 自动跳转到管理界面(在render中)
    if (user && user._id) {
        // 自动跳转到管理界面(在render中)
        return <Navigate to='/' replace />
    }

    const Item = Form.Item;

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { username, password } = values;
        reqLogin(username, password).then(
            response => {
                console.log('登录成功', response);
                if (response.status === 0) {
                    console.info( response.data );
                    // const result = response.data;
                    message.success('登录成功');
                    memoryUtils.user = response.data; //保存用户登录信息到内存
                    storageUtils.saveUser(response.data); //保存用户登录信息到localStorage
                    // 跳转到管理界面
                    // 这里使用replace, 不会再回退到登录页面
                    navigate('/', { replace: true });
                } else {
                    message.error(response.msg);
                }
            }
        ).catch(
            error => {
                console.log('登录失败', error);
            }
        )
    }

    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo" />
                <h1>React项目: 后台管理系统</h1>
            </header>
            <section className='login-content'>
                <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名!' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名至多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Item>
                    <Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码!' },
                            { min: 4, message: '密码至少4位' },
                            { max: 12, message: '密码至多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Item>
                </Form>
            </section>
        </div>
    )
}
