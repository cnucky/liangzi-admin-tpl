import { fetch } from '@/api/index'

//登录
export const login = (reqData) => fetch('POST','/adminapi/login/',{data: reqData})
//退出
export const loginOut = () => fetch('GET','/adminapi/logout/')

//判断用户是否登录
export const checkLogin = () => fetch('GET','/adminapi/auth_info/')

//获取用户
export const getCustomers = () => fetch('GET','/adminapi/customers/')

//赠送天数
export const setExtraDays = (param,reqData) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_extra/`,{data: reqData})
//设置邀请码
export const setInviteCode = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_invite_code/`)
//设置管理员
export const setAdmin = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_admin/`)
//取消管理员
export const setAdminNormal = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_normal/`)
//分页
export const page = (param) => fetch('GET',`/adminapi/customers/?page=${param.num}`)


//dashboard --监控人数
export const getEcharts = () => fetch('GET','/adminapi/stats/')

//监控--公网
export const getPublicEcharts = () => fetch('GET','/adminapi/public/')

//监控--gic
export const getGicEcharts = () => fetch('GET','/adminapi/gic/')



