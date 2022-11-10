import type GoodsType from '@/types/goods'
import type { AxiosPromise } from 'axios'
import { myAxios as axios } from './myAxios'

interface ApiBase {
  baseUrl: string,
  login: string,
  imgUpload: string,
  getDeskListWithOrder: string,
  getCurrentOrderList: string,
  getGoodsTypeList: string,
  getGoodsTypeWithGoods: string,
  getGoodsWithType: string,
  addGoods: string,
  editGoods: string,
  pullGoods: string,
  getGoodsById: string,
}

const base:ApiBase = {
  baseUrl: '/api',
  login: '/staff/login',
  imgUpload: '/file/imgUpload',
  getDeskListWithOrder: '/desk/getDeskListWithOrder',
  getCurrentOrderList: '/order',
  getGoodsTypeList: '/goodsType',
  getGoodsTypeWithGoods: '/goodsType/withGoods',
  getGoodsWithType: '/goods/withType',
  addGoods: '/goods',
  editGoods: '/goods',
  pullGoods: '/goods',
  getGoodsById: '/goods'
}

interface ApiObject {
  login:(data:Record<string,unknown>)=>AxiosPromise,
  imgUpload:(data:FormData)=>AxiosPromise,
  getDeskListWithOrder:()=>AxiosPromise,
  getCurrentOrderList:()=>AxiosPromise,
  getGoodsTypeList:()=>AxiosPromise,
  getGoodsTypeWithGoods:()=>AxiosPromise,
  getGoodsWithType:()=>AxiosPromise,
  addGoods:(data:GoodsType)=>AxiosPromise,
  editGoods:(id: string, data:GoodsType)=>AxiosPromise,
  pullGoods:(id: string, state: number)=>AxiosPromise,
  getGoodsById:(id: string)=>AxiosPromise,
}

const api: ApiObject = {
  login(data) {
    return axios.post(base.baseUrl + base.login, data)
  },
  imgUpload(data) {
    return axios.post(base.baseUrl + base.imgUpload, data ,{
      //设置请求头
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getDeskListWithOrder(){
    return axios.get(base.baseUrl + base.getDeskListWithOrder)
  },
  getCurrentOrderList(){
    return axios.get(base.baseUrl + base.getCurrentOrderList)
  },
  getGoodsTypeList(){
    return axios.get(base.baseUrl + base.getGoodsTypeList)
  },
  getGoodsTypeWithGoods(){
    return axios.get(base.baseUrl + base.getGoodsTypeWithGoods)
  },
  getGoodsWithType(){
    return axios.get(base.baseUrl + base.getGoodsWithType)
  },
  addGoods(data){
    return axios.post(base.baseUrl + base.addGoods, data)
  },
  editGoods(id, data){
    return axios.patch(base.baseUrl + base.editGoods + '/' + id, data)
  },
  pullGoods(id, state){
    return axios.patch(base.baseUrl + base.pullGoods + '/' + id, { state } )
  },
  getGoodsById(id){
    return axios.get(base.baseUrl + base.getGoodsById + '/' + id)
  },
}

export default api
