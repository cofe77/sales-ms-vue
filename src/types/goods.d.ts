import type OrderType from './order'

export default interface GoodsType {
  id: string,
  name: string,
  price: number,
  desc: string,
  discount: number,
  count: number,
  type: string,
  img: string,
  updateTime: string
}

export interface GoodsTypeType {
  id: string,
  name: string,
}

export interface OrderGoodsType {
  id: string,
  count: number,
  orderId: string,
  goodsId: string,
  goods: GoodsType,
  order: OrderType
}