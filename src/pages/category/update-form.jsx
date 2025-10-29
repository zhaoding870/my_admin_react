import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

import { Form, Input } from 'antd';


const UpdateForm = forwardRef(
    function UpdateForm(
        { category = {}, onFinish }, ref
    ) {
        const [form] = Form.useForm();
        // 当 category 变化时，把名称填入表单
        useEffect(() => {
            form.setFieldsValue({
                categoryName: category.name || ''
            });
        }, [category, form]);

        // 暴露一些方法给父组件
        useImperativeHandle(ref, () => (
            {
                validateFields: form.validateFields,
                getFieldsValue: form.getFieldsValue,
                setFieldValue: form.setFieldValue
            }
        ));

        return (
            <Form form={form} initialValues={{ categoryName: '' }} onFinish={onFinish}>
                <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, message: '请输入分类名称' }]}>
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        );
    }
);

export default UpdateForm;
