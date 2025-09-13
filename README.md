## 1. 使用技术
    react 18
    react-router-dom 18
    antd
    redux
    axios
    jsoup
    promise / await / async
    store (Local Storage)

## 2. 开发环境搭建
    2.1 使用 Vite 创建项目
        npm create vite@latest my_admin_react
        检查 package.json 中 react 的版本是不是 18。
        如果不是，可以手动安装
        npm install react@18 react-dom@18
    2.2 引入 antd 
        npm install antd
        把 antd 的版本修改为 4.24.12
    2.3 antd 实现按需加载
        npm install vite-plugin-style-import less consola --save-dev
        修改 vite.config.js
    2.4 引入路由
        npm install react-router-dom@6

## 3. 完成 login 组件的布局

## 4. 前后台交互 ajax
    安装依赖包 axios
        npm install axios
    配置代码
        修改 vite.config.js,添加 server 

## 5. 实现登陆用户，跳转到后台主页
    登陆成功后，保存用户到 内存
    保存用户到 local storage 中 (localStorage),实现自动登陆功能
        npm i store

## 7. react-router-dom 
    安装 react-router-dom 6

    react-router 中实现页面跳转
        命令式导航，通常在 JavaScript 中使用，比如事件处理函数，类似于调用函数实现页面跳转
        ```
        navigate('/', { replace: true })
        ```

        声明式导航， 通常在 JSX 中使用，比如渲染逻辑中根据某个条件跳转
        ```
        <Navigate to='/' replace />
        ```
        
## 6. Admin 页面布局
    