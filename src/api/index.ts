import type CarouselType from '@/types/carousel'
import type { DbName, ExistReqConditionType } from '@/types/common'
import type { DeskTypeType } from '@/types/desk'
import type DeskType from '@/types/desk'
import type { GoodsTypeType } from '@/types/goods'
import type GoodsType from '@/types/goods'
import type StaffType from '@/types/staff'
import type { VipTypeType } from '@/types/vip'
import type VipType from '@/types/vip'
import type { AxiosPromise } from 'axios'
import { myAxios as axios } from './myAxios'

interface ApiBase {
  baseUrl: string,
  login: string,
  imgUpload: string,
  checkIsExist: string,
  getDeskListWithOrder: string,
  getDeskListWithType: string,
  getCurrentOrderList: string,
  getGoodsTypeList: string,
  getGoodsTypeWithGoods: string,
  getGoodsWithType: string,
  addGoods: string,
  editGoods: string,
  pullGoods: string,
  removeGoods: string,
  getGoodsById: string,
  addGoodsType: string,
  editGoodsType: string,
  removeGoodsType: string,
  addDesk: string,
  editDesk: string,
  pullDesk: string,
  removeDesk: string,
  getDeskById: string,
  addDeskType: string,
  getDeskType: string,
  editDeskType: string,
  removeDeskType: string,
  addStaff: string,
  getStaffList: string,
  editStaff: string,
  pullStaff: string,
  removeStaff: string,
  addVip: string,
  getVipList: string,
  getVipWithType: string,
  editVip: string,
  pullVip: string,
  removeVip: string,
  getVipById: string,
  addVipType: string,
  getVipType: string,
  editVipType: string,
  removeVipType: string,
  addCarousel: string,
  getCarouselList: string,
  editCarousel: string,
  editCarouselIndex: string,
  pullCarousel: string,
  removeCarousel: string,
}

const base:ApiBase = {
  baseUrl: '/api',
  login: '/staff/login',
  imgUpload: '/file/imgUpload',
  checkIsExist: '/checkIsExist',
  getDeskListWithOrder: '/desk/withOrder',
  getDeskListWithType: '/desk/withType',
  getCurrentOrderList: '/order',
  getGoodsTypeList: '/goodsType',
  getGoodsTypeWithGoods: '/goodsType/withGoods',
  getGoodsWithType: '/goods/withType',
  addGoods: '/goods',
  editGoods: '/goods',
  pullGoods: '/goods',
  removeGoods: '/goods',
  getGoodsById: '/goods',
  addGoodsType: '/goodsType',
  editGoodsType: '/goodsType',
  removeGoodsType: '/goodsType',
  addDesk: '/desk',
  editDesk: '/desk',
  pullDesk: '/desk',
  removeDesk: '/desk',
  getDeskById: '/desk',
  addDeskType: '/deskType',
  getDeskType: '/deskType',
  editDeskType: '/deskType',
  removeDeskType: '/deskType',
  addStaff: '/staff',
  getStaffList: '/staff',
  editStaff: '/staff',
  pullStaff: '/staff',
  removeStaff: '/staff',
  addVip: '/vip',
  getVipList: '/vip',
  getVipWithType: '/vip/withType',
  editVip: '/vip',
  pullVip: '/vip',
  removeVip: '/vip',
  getVipById: '/vip',
  addVipType: '/vipType',
  getVipType: '/vipType',
  editVipType: '/vipType',
  removeVipType: '/vipType',
  addCarousel: '/carousel',
  getCarouselList: '/carousel',
  editCarousel: '/carousel',
  editCarouselIndex: '/carousel/editIndex',
  pullCarousel: '/carousel',
  removeCarousel: '/carousel',
}

interface ApiObject {
  login:(data:Record<string,unknown>)=>AxiosPromise,
  imgUpload:(data:FormData)=>AxiosPromise,
  checkIsExist:(dbName: DbName, condition: ExistReqConditionType)=>AxiosPromise,
  getDeskListWithOrder:()=>AxiosPromise,
  getDeskListWithType:()=>AxiosPromise,
  getCurrentOrderList:()=>AxiosPromise,
  getGoodsTypeList:()=>AxiosPromise,
  getGoodsTypeWithGoods:()=>AxiosPromise,
  getGoodsWithType:()=>AxiosPromise,
  addGoods:(data:GoodsType)=>AxiosPromise,
  editGoods:(id: string, data:GoodsType)=>AxiosPromise,
  pullGoods:(id: string, state: number)=>AxiosPromise,
  removeGoods:(id: string)=>AxiosPromise,
  getGoodsById:(id: string)=>AxiosPromise,
  addGoodsType:(data:GoodsTypeType)=>AxiosPromise,
  editGoodsType:(id: string, data:GoodsTypeType)=>AxiosPromise,
  removeGoodsType:(id: string)=>AxiosPromise,
  addDesk:(data:DeskType)=>AxiosPromise,
  editDesk:(id: string, data:DeskType)=>AxiosPromise,
  pullDesk:(id: string, state: number)=>AxiosPromise,
  removeDesk:(id: string)=>AxiosPromise,
  getDeskById:(id: string)=>AxiosPromise,
  addDeskType:(data:DeskTypeType)=>AxiosPromise,
  getDeskType:()=>AxiosPromise,
  editDeskType:(id: string, data:DeskTypeType)=>AxiosPromise,
  removeDeskType:(id: string)=>AxiosPromise,
  addStaff:(data:StaffType)=>AxiosPromise,
  getStaffList:()=>AxiosPromise,
  editStaff:(id: string, data:StaffType)=>AxiosPromise,
  pullStaff:(id: string, state: number)=>AxiosPromise,
  removeStaff:(id: string)=>AxiosPromise,
  addVip:(data:VipType)=>AxiosPromise,
  getVipList:()=>AxiosPromise,
  getVipWithType:()=>AxiosPromise,
  editVip:(id: string, data:VipType)=>AxiosPromise,
  pullVip:(id: string, state: number)=>AxiosPromise,
  removeVip:(id: string)=>AxiosPromise,
  getVipById:(id: string)=>AxiosPromise,
  addVipType:(data:VipTypeType)=>AxiosPromise,
  getVipType:()=>AxiosPromise,
  editVipType:(id: string, data:VipTypeType)=>AxiosPromise,
  removeVipType:(id: string)=>AxiosPromise,
  addCarousel:(data:CarouselType)=>AxiosPromise,
  getCarouselList:()=>AxiosPromise,
  editCarousel:(id: string, data:CarouselType)=>AxiosPromise,
  editCarouselIndex:(currentId: string, targetId:string)=>AxiosPromise,
  pullCarousel:(id: string, state:number)=>AxiosPromise,
  removeCarousel:(id: string)=>AxiosPromise,
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
  checkIsExist(dbName, condition){
    return axios.post(base.baseUrl + base.checkIsExist, {dbName, condition})
  },
  getDeskListWithOrder(){
    return axios.get(base.baseUrl + base.getDeskListWithOrder)
  },
  getDeskListWithType(){
    return axios.get(base.baseUrl + base.getDeskListWithType)
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
  removeGoods(id){
    return axios.delete(base.baseUrl + base.removeGoods + '/' + id)
  },
  getGoodsById(id){
    return axios.get(base.baseUrl + base.getGoodsById + '/' + id)
  },
  addGoodsType(data){
    return axios.post(base.baseUrl + base.addGoodsType, data)
  },
  editGoodsType(id, data){
    return axios.patch(base.baseUrl + base.editGoodsType + '/' + id, data)
  },
  removeGoodsType(id){
    return axios.delete(base.baseUrl + base.removeGoodsType + '/' + id)
  },
  addDesk(data){
    return axios.post(base.baseUrl + base.addDesk, data)
  },
  editDesk(id, data){
    return axios.patch(base.baseUrl + base.editDesk + '/' + id, data)
  },
  pullDesk(id, state){
    return axios.patch(base.baseUrl + base.pullDesk + '/' + id, { state } )
  },
  removeDesk(id){
    return axios.delete(base.baseUrl + base.removeDesk + '/' + id)
  },
  getDeskById(id){
    return axios.get(base.baseUrl + base.getDeskById + '/' + id)
  },
  addDeskType(data){
    return axios.post(base.baseUrl + base.addDeskType, data)
  },
  getDeskType(){
    return axios.get(base.baseUrl + base.getDeskType)
  },
  getStaffList(){
    return axios.get(base.baseUrl + base.getStaffList)
  },
  editDeskType(id, data){
    return axios.patch(base.baseUrl + base.editDeskType + '/' + id, data)
  },
  removeDeskType(id){
    return axios.delete(base.baseUrl + base.removeDeskType + '/' + id)
  },
  addStaff(data){
    return axios.post(base.baseUrl + base.addStaff, data)
  },
  editStaff(id, data){
    return axios.patch(base.baseUrl + base.editStaff + '/' + id, data)
  },
  pullStaff(id, state){
    return axios.patch(base.baseUrl + base.pullStaff + '/' + id, { state } )
  },
  removeStaff(id){
    return axios.delete(base.baseUrl + base.removeStaff + '/' + id)
  },
  addVip(data){
    return axios.post(base.baseUrl + base.addVip, data)
  },
  getVipList(){
    return axios.get(base.baseUrl + base.getVipList)
  },
  getVipWithType() {
    return axios.get(base.baseUrl + base.getVipWithType)
  },
  editVip(id, data){
    return axios.patch(base.baseUrl + base.editVip + '/' + id, data)
  },
  pullVip(id, state){
    return axios.patch(base.baseUrl + base.pullVip + '/' + id, { state } )
  },
  removeVip(id){
    return axios.delete(base.baseUrl + base.removeVip + '/' + id)
  },
  getVipById(id){
    return axios.get(base.baseUrl + base.getVipById + '/' + id)
  },
  addVipType(data){
    return axios.post(base.baseUrl + base.addVipType, data)
  },
  getVipType(){
    return axios.get(base.baseUrl + base.getVipType)
  },
  editVipType(id, data){
    return axios.patch(base.baseUrl + base.editVipType + '/' + id, data)
  },
  removeVipType(id){
    return axios.delete(base.baseUrl + base.removeVipType + '/' + id)
  },
  addCarousel(data){
    return axios.post(base.baseUrl + base.addCarousel, data)
  },
  getCarouselList(){
    return axios.get(base.baseUrl + base.getCarouselList)
  },
  editCarousel(id, data){
    return axios.patch(base.baseUrl + base.editCarousel + '/' + id, data)
  },
  editCarouselIndex(currentId, targetId){
    return axios.patch(base.baseUrl + base.editCarouselIndex + '/' + currentId, { targetId })
  },
  pullCarousel(id, state){
    return axios.patch(base.baseUrl + base.pullCarousel + '/' + id, { state } )
  },
  removeCarousel(id){
    return axios.delete(base.baseUrl + base.removeCarousel + '/' + id)
  },
}

export default api
