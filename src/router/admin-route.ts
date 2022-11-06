export const AdminRoute = [
  {
    path: '/admin',
    icon: 'House',
    name: '首页'
  },
  {
    path: '/admin/goods',
    icon: 'Goods',
    name: '商品',
    children: [
      {
        path: '/admin/goods/list',
        icon: '',
        name: '所有商品'
      },
      {
        path: '/admin/goods/add',
        icon: '',
        name: '新增商品'
      }
    ]
  },
  {
    path: '/admin/desk',
    icon: 'TakeawayBox',
    name: '桌位'
  },
  {
    path: '/admin/user',
    icon: 'User',
    name: '员工'
  },
  {
    path: '/admin/vip',
    icon: 'Avatar',
    name: 'VIP'
  },
  {
    path: '/admin/carousel',
    icon: 'Picture',
    name: '轮播图'
  },
  {
    path: '/admin/savedBeer',
    icon: 'GobletFull',
    name: '存酒'
  },
  {
    path: '/admin/order',
    icon: 'Memo',
    name: '订单'
  },
  {
    path: '/admin/analyse',
    icon: 'DataLine',
    name: '统计'
  }
]