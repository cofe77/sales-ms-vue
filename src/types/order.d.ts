
import GoodsType from './goods.d'
export default interface OrderType {
  id: string,
  deskId: string,
  consume: number,
  discount: number,
  vipId: string,
  finishTime: string,
  checkoutType: number,
  cash: number,
  onlinePay: number,
  createTime: string
}

export interface CreateOrderType {
  deskId: string,
  staffId: string,
  goods: {
    item: GoodsType,
    count: number
  }[]
}