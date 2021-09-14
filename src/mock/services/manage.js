import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
const Random = require('mockjs2').Random

const totalCount = 57

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: Mock.mock('@guid'),
      domain: Mock.mock('@domain'),
      name: Mock.mock('@cname') + '的门店',
      isCompany: Mock.mock('@integer(0, 1)'),
      dataUpdate: Mock.mock('@datetime'),
      dataAdd: Mock.mock('@datetime'),
      lang: Mock.mock('@pick(CN,EN,US,JP,FR,UK,TW,HK)'),
      vipPlanCd: Mock.mock('@integer(1, 365)'),
      shopLevelID: Mock.mock('@integer(0, 3)'),
      mallAdminUserId: Mock.mock('@integer(1111, 9999)'),
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 2)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const goodsList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: Mock.mock('@integer(4000, 8000)'),
      domain: Mock.mock('@domain'),
      name: Mock.mock('@cword(3)' + '@pick(毛衣,毛裤,上衣,短袖,鞋,短裤,袜子,手套)'),
      numberOrders: Mock.mock('@integer(0, 500)'),
      numberSells: Mock.mock('@integer(0, 500)' + ' 件'),
      originalPrice: Mock.mock('￥' + '@integer(200, 500)'),
      pic: Mock.mock(Random.image('200x100')),
      stores: Mock.mock('@integer(0, 500)' + ' 件'),
      views: Mock.mock('@integer(4000, 8000)' + ' 次'),
      statusStr: Mock.mock('@pick(已上架,已下架)'),
      barCode: Mock.mock('@integer(11111111111111, 99999999999999)'),
      categoryId: Mock.mock('@integer(4000, 8000)'),
      characteristic: Mock.mock('@pick(保暖雨鞋,拼色打底袜,可爱打底袜,中小童毛衣,小狗图案毛衣,小童毛衣背心,小童爆款马甲 这个天气刚刚好穿,多色可选的马甲,可爱毛衣,女孩子喜欢的圈圈毛衣 加绒,加绒毛衣 性价比高,加绒毛衣 中大童,加绒毛衣 不久的北方就要穿到了,高品质的夹克外套,貂绒毛衣 男孩女孩都适合,男童风衣,兔毛 手感好 质量更好)'),
      commission: Mock.mock('￥' + '@integer(20, 50)'),
      commissionType: Mock.mock('@pick(分销佣金,推荐佣金,拼团佣金,提货佣金)'),
      gotScore: Mock.mock('@integer(0, 500)' + ' 分'),
      gotScoreType: Mock.mock('@pick(固定积分,推荐积分,分销积分)'),
      kanjia: Mock.mock('@pick(是,否)'),
      kanjiaPrice: Mock.mock('￥' + '@integer(20, 50)'),
      logisticsId: Mock.mock('@pick(京东物流,韵达物流,兄弟物流，EMS物流，德邦物流)'),
      minPrice: Mock.mock('￥' + '@integer(200, 500)'),
      minScore: Mock.mock('@integer(10, 50)' + ' 分'),
      numberFav: Mock.mock('￥' + '@integer(20, 50)'),
      numberGoodReputation: Mock.mock('@integer(0, 100)'),
      paixu: Mock.mock('@integer(1000, 9000)'),
      pingtuan: Mock.mock('@pick(是,否)'),
      pingtuanPrice: Mock.mock('￥' + '@integer(50, 100)'),
      recommendStatus: Mock.mock('@pick(推荐,正常)'),
      shopId: Mock.mock('@integer(4000, 8000)'),
      status: Mock.mock('@pick(正常,禁用)'),
      userId: Mock.mock('@integer(4000, 8000)'),
      weight: Mock.mock('@integer(1, 5)' + ' kg'),
      videoId: Mock.mock('@integer(11111111111, 99999999999)'),
      tags: Mock.mock('@pick(火爆,网红款,爆款,平价,活动,特价,直营)'),
      propertyIds: Mock.mock('@integer(4000, 8000)'),
      recommendStatusStr: Mock.mock('@pick(推荐,不推荐)'),
      dateAdd: Mock.mock('@datetime'),
      dateStart: Mock.mock('@datetime'),
      dateUpdate: Mock.mock('@datetime'),
      content: Mock.mock('@cparagraph'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    'data': [{
      id: 1,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: 'Alipay',
      description: '那是一种内在的东西， 他们到达不了，也无法触及的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 2,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 3,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: 'Ant Design',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 4,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: 'Ant Design Pro',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 5,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: 'Bootstrap',
      description: '凛冬将至',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 6,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      title: 'Vue',
      description: '生命就像一盒巧克力，结果往往出人意料',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    }
    ],
    'pageSize': 10,
    'pageNo': 0,
    'totalPage': 6,
    'totalCount': 57
  })
}

const activity = () => {
  return builder([{
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '蓝莓酱',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划'
    },
    time: '2018-08-23 09:35:37'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '白鹭酱油开发组',
      action: '创建',
      event: '番组计划'
    },
    time: '2017-05-27 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: '更新',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代'
    },
    time: '2018-08-23 14:47:00'
  }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: '科学搬砖组',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: '程序员日常',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: '设计天团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: '中二少女团',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  },
  {
    id: 1,
    name: '骗你学计算机',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '引用',
    '个人': 70,
    '团队': 30,
    '部门': 40
  },
  {
    item: '口碑',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '产量',
    '个人': 50,
    '团队': 60,
    '部门': 40
  },
  {
    item: '贡献',
    '个人': 40,
    '团队': 50,
    '部门': 40
  },
  {
    item: '热度',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '引用',
    '个人': 70,
    '团队': 50,
    '部门': 40
  }
  ])
}

Mock.mock(/\/goods/, 'get', goodsList)
Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
