import { fetch } from '@/api/index'

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


//dashboard
export const getEcharts = () => fetch('GET','/adminapi/stats/')

