import React, {
    useMemo, useState, useEffect,
    useCallback
} from 'react';

import {
    Card,
    Select,
    Input,
    Button,
    Table
} from 'antd';

import {
    PlusOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/constraint';
import { reqProducts, reqSearchProducts } from '../../api';

export default function ProductHome() {
    // 商品列表
    const [products, setProducts] = useState([]);
    // 商品总数
    const [total, setTotal] = useState(0);
    // 是否正在加载中
    const [loading, setLoading] = useState(false);
    const [searchType, setSearchType] = useState('productName'); // 搜索类型
    const [searchName, setSearchName] = useState(''); // 搜索关键字

    // 为避免输入(searchName/searchType)变化时重新创建函数并触发 useEffect 导致自动搜索，
    // 这里让 getProducts 接受可选的搜索参数 (sName, sType)。
    // 只有在明确传入 sName 时才执行搜索；否则为普通分页查询。
    const getProducts = useCallback(async (pageNum, pageSize, sName, sType) => {
        setLoading(true);
        let result;
        if (sName) {
            // 按照关键字搜索分页列表（只有调用时传入 sName 才会触发）
            result = await reqSearchProducts(pageNum, pageSize, sName, sType);
        } else {
            // 一般分页列表
            result = await reqProducts(pageNum, pageSize);
        }
        setLoading(false);
        if (result && result.status === 0) {
            const { total, list } = result.data;
            setTotal(total);
            setProducts(list);
        }
    }, []);


    // 获取商品列表
    useEffect(() => {
        getProducts(1, PAGE_SIZE);
    }, [getProducts]);


    // 定义Card组件title和extra属性的值
    const cardTitle = useMemo(() => (
        <>
            <Select
                options={[
                    { value: 'productName', label: '按名称搜索' },
                    { value: 'productDesc', label: '按描述搜索' }
                ]}
                value={searchType}
                onChange={value => setSearchType(value)}
            />
            <Input
                placeholder="请输入搜索内容"
                value={searchName}
                style={{ width: 150, margin: '0 15px' }}
                onChange={e => setSearchName(e.target.value)}
            />
            <Button type="primary" onClick={() => getProducts(1, PAGE_SIZE, searchName, searchType)}>搜索</Button>
        </>

    ), [setSearchType, setSearchName, getProducts, searchType, searchName]);

    const cardExtra = useMemo(() => (
        <Button type="primary" icon={<PlusOutlined />}>添加商品</Button>
    ), []);

    // 定义table的列信息
    const columns = useMemo(() => ([
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品描述',
            dataIndex: 'desc'
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => '¥' + price // 格式化价格
        },
        {
            width: 100,
            title: '状态',
            dataIndex: 'status',
            render: (status) => {
                const btnText = status === 1 ? '下架' : '上架';
                const statusText = status === 1 ? '在售' : '已下架';
                return (
                    <span>
                        <Button type="primary">{btnText}</Button>
                        <span style={{ marginLeft: 10 }}>{statusText}</span>
                    </span>
                )
            }
        },
        {
            width: 100,
            title: '操作',
            render: () => (
                <>
                    <LinkButton >详情</LinkButton>
                    <br />
                    <LinkButton >修改</LinkButton>
                </>
            )
        }
    ]), []);

    return (
        <Card
            title={cardTitle}
            extra={cardExtra}
        >
            <Table
                loading={loading}
                pagination={{
                    total,
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange: (pageNum, pageSize) => getProducts(pageNum, pageSize, searchName, searchType)
                }}
                columns={columns}
                dataSource={products}
                bordered
                rowKey="key"
            />
        </Card>
    )
}
