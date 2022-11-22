type DbName = 'desk' | 'deskType' | 'goods' | 'goodsType' | 'vip' | 'vipType' | 'staff' | 'savedBeer' | 'order'

interface ExistReqConditionType {
  id?: string,
  name?: string,
  tel?: number,
  typeId?: string,
}

export { DbName, ExistReqConditionType }