import type OrderType from './order'
import type DeskType from './desk'

export default interface GoodsType {
  id?: string,
  name: string,
  price: number,
  desc: string,
  discount: number,
  count: number,
  typeId: string,
  img: string,
  state: number,
  updateTime?: string
}

export interface GoodsTypeType {
  id?: string,
  name: string,
}

export interface OrderGoodsType {
  id?: string,
  count: number,
  orderId: string,
  goodsId: string,
  goods: GoodsType,
  desk: DeskType,
  order: OrderType
}