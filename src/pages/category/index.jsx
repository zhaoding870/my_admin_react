import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd';

import {
    PlusOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import AddForm from './add-form';
import UpdateForm from './update-form';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';

export default function Category() {
    const [categorys, setCategorys] = useState([]);
    const [subCategorys, setSubCategorys] = useState([]);
    const [parentId, setParentId] = useState('0');
    const [parentName, setParentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState({});
    const updateFormRef = useRef();
    const addFormRef = useRef();

    // useCallback 用于 memoize 获取分类列表的函数，避免每次渲染都创建新引用
    const getCategorys = useCallback(async (pid = '0') => {
        setLoading(true);
        try {
            const result = await reqCategorys(pid);
            if (result.status === 0) {
                if (pid === '0') {
                    setCategorys(result.data);
                } else {
                    setSubCategorys(result.data);
                }
            } else {
                message.error('获取分类列表失败');
            }
        } catch (error) {
            console.error('获取分类列表异常', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 首次加载和 parentId 变化时获取分类列表
    useEffect(() => {
        getCategorys(parentId);
    }, [getCategorys, parentId]);

    const handleViewSub = useCallback((category) => {
        if (!category || !category._id) return;
        setParentId(category._id);
        setParentName(category.name || '');
        // getCategorys(category._id); // 由 useEffect 负责调用
    }, []);

    /**
     *  返回一级分类列表
     * */
    const handleBackToParent = useCallback(() => {
        setParentId('0');
        setParentName('');
        // getCategorys('0'); // 由 useEffect 负责调用
        setSubCategorys([]);
    }, []);

    /**
     * 关闭对话框
     */
    const handleCancel = useCallback(() => {
        setIsModalOpen(0);
    }, []);

    const handleSaveCategory = useCallback(async () => {
        // 添加分类的逻辑
        const values = await addFormRef.current.validateFields();
        const results = await reqAddCategory(values.categoryName, values.parentId);
        if (results.status === 0) {
            message.success('添加分类成功');
            setIsModalOpen(0);
            // 如果添加的分类就是当前分类列表下的分类，则重新获取列表显示
            if (values.parentId === parentId) {
                getCategorys(parentId);
            } else if (values.parentId === '0') {
                // 如果在一级分类列表下添加二级分类，则重新获取一级分类列表，但不需要显示出来
                getCategorys('0');
            }
            addFormRef.current.setFieldsValue({
                'categoryName': '',
                'parentId': '0'
            });
        } else {
            message.error('添加分类失败');
        }
    }, [parentId, getCategorys]);

    const handleUpdateCategory = useCallback(async () => {
        // 更新分类的逻辑
        const values = await updateFormRef.current.validateFields();
        const result = await reqUpdateCategory({ categoryId: selectedCategory._id, categoryName: values.categoryName });
        if (result.status === 0) {
            message.success('更新分类成功');
            setIsModalOpen(0);
            getCategorys(parentId);
        } else {
            message.error('更新分类失败');
        }
    }, [getCategorys, parentId, selectedCategory]);

    const openUpdateModal = useCallback((category) => {
        // 打开更新分类对话框
        setIsModalOpen(2);
        setSelectedCategory(category);
    }, []);

    const openAddModal = useCallback(() => {
        // 打开添加分类对话框
        setIsModalOpen(1);
    }, []);

    /**
     * useMemo 用于 memoize 添加按钮，避免每次渲染都创建新引用
     */
    const extra = useMemo(() => (
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
            添加
        </Button>
    ), [openAddModal]);

    /**
     * useMemo 用于 memoize 列定义，避免每次渲染都创建新引用
     */
    const columns = useMemo(() => [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            render: (text, category) => (
                <>
                    <Button type="link" onClick={() => openUpdateModal(category)}>修改分类</Button>
                    {parentId === '0' && (
                        <Button type="link" onClick={() => handleViewSub(category)}>查看子分类</Button>
                    )}
                </>
            )
        }
    ], [handleViewSub, openUpdateModal, parentId]);

    const title = parentId === '0' ? '一级分类列表' : (
        <>
            <LinkButton onClick={() => handleBackToParent()}>一级分类列表</LinkButton>
            <span>&nbsp; &gt; &nbsp;{parentName}</span>
        </>
    );

    return (
        <Card
            title={title}
            extra={extra}
        >
            <Table
                dataSource={parentId === '0' ? categorys : subCategorys}
                columns={columns}
                bordered
                rowKey="_id"
                loading={loading}
                pagination={{ defaultPageSize: 5, showQuickJumper: true }}
            />
            <Modal title="添加分类"
                open={isModalOpen === 1}
                onOk={handleSaveCategory}
                onCancel={handleCancel}
            >
                <AddForm ref={addFormRef} categorys={categorys} />
            </Modal>
            <Modal title="更新分类"
                open={isModalOpen === 2}
                onOk={handleUpdateCategory}
                onCancel={handleCancel}
            >
                <UpdateForm ref={updateFormRef} category={selectedCategory} />
            </Modal>
        </Card>
    )
}
