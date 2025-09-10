## 1. 使用技术
    react 18
    react-router-dom 18
    antd
    redux
    axios
    jsoup
    promise / await / async

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
