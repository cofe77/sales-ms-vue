import type { UpdateOrderType } from './order'
import type OrderType from './order'

export default interface CreateDeskType {
  name: string,
  orderId?: string,
  order?: UpdateOrderType,
  typeId: string,
  type?: DeskTypeType
  state?: number,
}

export interface UpdateDeskType extends CreateDeskType {
  id: string
}

interface DeskTypeType {
  id?: string,
  name: string,
}