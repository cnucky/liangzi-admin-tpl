import { fetch } from '@/api/index'

export const getCustomers = () => fetch('GET','/adminapi/customers/')

//赠送天数
export const setExtraDays = (param,reqData) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_extra/`,{data: reqData})