/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */

import ajax from './ajax'

const BASE = '/api' // 基础路径

// 登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST');

// 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId });

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST');

// 更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST');

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize });

/**
 * 搜查商品分页列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @param {*} searchName 
 * @param {*} searchType ： productDesc/ productName。按照哪个字段搜索
 * productDesc 表示按商品描述搜索， productName表示按商品名称搜索
 * 
 * 变量的值当作对象的key时，必须用[]包起来
 * @returns 
 */
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
});