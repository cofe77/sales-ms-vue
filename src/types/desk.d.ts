import type OrderType from './order'

export default interface DeskType {
  id: string,
  name: string,
  orderId: number,
  order: OrderType,
  typeId: string,
  type: DeskTypeType
  state: string,
}

interface DeskTypeType {
  id: string,
  name: '',
}