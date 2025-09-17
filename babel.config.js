export default {
    presets: ['@babel/preset-react'],
    plugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true // 自动引入 less 文件
            },
            'antd'
        ]
    ]
};
