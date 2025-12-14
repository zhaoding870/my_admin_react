import {
    Card,
    List
} from 'antd';

import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import React from 'react';

const Item = List.Item;

export default function ProductDetail() {
    const title = (
        <span>
            <ArrowLeftOutlined style={{ color: '#1DA57A' }} />
            <span style={{ marginLeft: 20 }}>商品详情</span>
        </span>
    );
    return (
        <Card title={title} className='product-detail'>
            <List>
                <Item>
                    <span className='left'>商品名称：</span>
                    <span className='right'>联想ThinkPad X1 Carbon</span>
                </Item>
                <Item>
                    <span className='left'>商品描述：</span>
                    <span className='right'>
                        联想ThinkPad X1 Carbon(2019)采用14英寸屏幕，搭载英特尔酷睿i7-8565U处理器，16GB内存，512GB固态硬盘，集成英特尔UHD Graphics 620显卡，预装Windows 10专业版操作系统。
                    </span>
                </Item>
                <Item>
                    <span className='left'>商品价格：</span>
                    <span className='right'>￥5000</span>
                </Item>
                <Item>
                    <span className='left'>所属分类：</span>
                    <span className='right'>电脑 ---&gt; 笔记本</span>
                </Item>
                <Item>
                    <span className='left'>商品图片：</span>
                    <span className='right'>
                        <img src='https://img14.360buyimg.com/n1/jfs/t1/22597/28/0185/153623/5c8f4f4dE2f91e4a6/5d1f3f7f6e3f5d6b.jpg' 
                        alt='商品图片' className='product-img' />
                        <img src='https://img14.360buyimg.com/n1/jfs/t1/22597/28/0185/153623/5c8f4f4dE2f91e4a6/5d1f3f7f6e3f5d6b.jpg' 
                        alt='商品图片' className='product-img' />
                    </span>
                </Item>
                <Item>
                    <span className='left'>商品详情：</span>
                    <span className='right' dangerouslySetInnerHTML={{__html: '<h1 style="color: red;">商品详情的内容标题</h1>'}}>
                    </span>
                </Item>
            </List>
        </Card>
    )
}
