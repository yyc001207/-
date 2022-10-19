//统一管理项目前部的接口
import requests from "./request";
import mockRequests from './mockRequests';
//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategory = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}

//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })

//搜索模块数据 地址:/api/list   请求方式：post 需要带参数
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取商品详情 地址：/api/item/{ skuId }  必须带参数商品id
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//添加更新购物车 地址：/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表 地址：/api/cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品 地址：/api/cart/deleteCart/{skuId}
export const reqDeletCartById = (skuId) => requests({ url: `cart/deleteCart/${skuId}`, method: 'delete' })

//切换商品状态 地址：/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })

//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册用户 /api/user/passport/register
export const reqUserRegister = (data) => ({ url: `/user/passport/register`, data, method: 'post' })

//用户登录 /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

//token校验用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatue = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取我的订单 /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })