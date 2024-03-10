
import DeskType from './desk.d'

export default interface CreateOrderType {
  desk: DeskType,
  deskId: string,
  staffId: string,
  consume: number,
  item: {
    goods: UpdateGoodsType,
    count: number
  }[]
}

export interface UpdateOrderType extends CreateOrderType {
  id: string,
  discount: number,
  consume: number,
  vipId: string,
  finishTime?: string,
  checkoutType: number,
  cash: number,
  onlinePay: number,
  createTime?: string
}