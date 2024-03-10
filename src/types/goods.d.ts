import type OrderType from './order'
import type DeskType from './desk'

export default interface CreateGoodsType {
  name: string,
  price: number,
  desc: string,
  discount: number,
  count: number,
  typeId: string,
  img: string,
  state: number,
}
export interface UpdateGoodsType extends CreateGoodsType {
  id: string,
  updateTime?: string
}

export interface GoodsTypeType {
  id?: string,
  name: string,
  goods?: GoodsType[],
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