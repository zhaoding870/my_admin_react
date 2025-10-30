import React, {
    useMemo, useState, useEffect
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
import { reqProducts } from '../../api';

export default function ProductHome() {
    // 商品列表
    const [products, setProducts] = useState([]);
    // 商品总数
    const [total, setTotal] = useState(0);
    // 是否正在加载中
    const [loading, setLoading] = useState(false);

    // 获取商品列表
    useEffect(() => {
        getProducts(1, PAGE_SIZE);
    }, []);

    const getProducts = async (pageNum, pageSize) => {
        setLoading(true);
        const result = await reqProducts(pageNum, pageSize);
        setLoading(false);
        if (result.status === 0) {
            const { total, list } = result.data;
            setTotal(total);
            setProducts(list);
        }
    };

    // 定义Card组件title和extra属性的值
    const cardTitle = useMemo(() => (
        <>
            <Select
                options={[
                    { value: '1', label: '按名称搜索' },
                    { value: '2', label: '按描述搜索' }
                ]}
                defaultValue="1"
            />
            <Input
                placeholder="请输入搜索内容"
                style={{ width: 150, margin: '0 15px' }}
            />
            <Button type="primary">搜索</Button>
        </>

    ), []);

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
                    onChange: getProducts
                }}
                columns={columns}
                dataSource={products}
                bordered
                rowKey="key"
            />
        </Card>
    )
}
