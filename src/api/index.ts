import type { AxiosPromise } from 'axios'
import { myAxios as axios } from './myAxios'

interface ApiBase {
  baseUrl: string,
  login: string,
  getDeskListWithOrder: string,
  getDispatchList: string,
  getCurrentOrderList: string
}

const base:ApiBase = {
  baseUrl: '/api',
  login: '/staff/login',
  getDeskListWithOrder: '/desk/getDeskListWithOrder',
  getDispatchList: '/dispatch',
  getCurrentOrderList: '/order'
}

interface ApiObject {
  login:(data:Record<string,unknown>)=>AxiosPromise,
  getDeskListWithOrder:()=>AxiosPromise,
  getDispatchList:()=>AxiosPromise,
  getCurrentOrderList:()=>AxiosPromise,
}

const api: ApiObject = {
  login (data) {
    return axios.post(base.baseUrl + base.login, data)
  },
  getDeskListWithOrder(){
    return axios.get(base.baseUrl + base.getDeskListWithOrder)
  },
  getDispatchList(){
    return axios.get(base.baseUrl + base.getDispatchList)
  },
  getCurrentOrderList(){
    return axios.get(base.baseUrl + base.getCurrentOrderList)
  },
}

export default api
