import React, { forwardRef, useImperativeHandle } from 'react';

import { Button, Form, Input, Select } from 'antd';

const AddForm = forwardRef(function AddForm({ categorys = [] }, ref) {
    const [form] = Form.useForm();

    // 暴露一些方法给父组件
    useImperativeHandle(ref, () => (
        {
            validateFields: form.validateFields,
            getFieldsValue: form.getFieldsValue,
            setFieldsValue: form.setFieldsValue
        }
    ));

    return (
        <Form form={form} initialValues={{ parentId: '0', categoryName: '' }} ref={ref}>
            <Form.Item name="parentId" label="所属分类" rules={[{ required: true, message: '请选择所属分类' }]}>
                <Select>
                    <Select.Option value="0">一级分类</Select.Option>
                    {
                        categorys.map(c => <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, message: '请输入分类名称' }]}>
                <Input placeholder="请输入分类名称" />
            </Form.Item>
        </Form>
    );
});

export default AddForm;
