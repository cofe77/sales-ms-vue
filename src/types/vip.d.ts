export default interface VipType {
  id?: string,
  name: string,
  typeId: string,
  tel: string,
  state: number,
  balance: number,
  updateTime?: string
}

export interface VipTypeType {
  id?: string,
  name: string,
  discount: number
}