import request from '../request/request.js'
// 精品推荐
export const JingPinAPI = () => request.get('products/recommend')
// 热门兑换
export const remAPI = () => request.get('products/hot')
// 商品详情
export const detailsAPI = (id) => request.get(`products/${id}`)
// 商品搜索
export const GoodSearchAPI = (params) => request.get('/products', { params })
// 手机号验证
import qs from 'qs'
export const PhoneLoginAPI = (params) => request.post('/phoneRegin', qs.stringify(params))
// 获取用户信息
export const userProfilesAPI = () => request.get('/shop/userProfiles')
// 加入购物车
export const addCartAPI = (params) => request.post('/shop/carts/add', qs.stringify(params))
// 查看购物车
export const viewCartAPI = () => request.get('/shop/carts')
// 购物车删除商品
export const subGoodsAPI = (id) => request.delete(`/shop/carts?productIds=${id}`)
// 修改购物车数据
export const putCartAPI = (params) => request.put('/shop/carts', params)