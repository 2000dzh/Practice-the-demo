//分类数据
export interface List {
  id: string
  name: string
  picture: string
  goods: merchandiseGoods[]
  children: List[]
  open: boolean
  brands?: []
}

//新鲜好物,人气推荐,商品数据
export interface GOODS extends LATEST_TOPIC<string> {
  id: string
  picture: string
  name: string,
  price: string
  title: string
  alt: string
  children: { name: string, id: number }[]
  saleInfo: string
  goods: merchandiseGoods[]
}

export interface merchandiseGoods {
  picture: string
  name: string
  tag: string
  price: string
  id: string
  desc: string
}

//最新专题
interface LATEST_TOPIC<T> {
  cover: T
  summary: T
  lowestPrice: T
  collectNum: T
  viewNum: T
  replyNum: T
}

//分类商品
export interface CLASSIFIED_GOODS {
  id: string
  name: string
  desc: string
  goods: Partial<CLASSIFIED_GOODS>[]
}

//请求商品列表条件
export interface REQUEST_PRODUCT_LIST_CONDITION {
  inventory: boolean
  onlyDiscount: boolean
  sortField: string | null
  sortMethod: string | null
}

//商品详情
type PARENT = { name: string, id: string, parent: PARENT }
type USER_ADDRESSES<T> = {
  isDefault: number,
  provinceCode: T,
  cityCode: T,
  countyCode: T,
  fullLocation: T
}
export interface SPECS {
  id: string
  name: string
  values: SPEC_VALUES[]
}
export type SPEC_VALUES = {
  desc: string
  name: string
  picture: string
  selected: boolean
  disabled: boolean
}
export interface SKUS {
  id: string
  inventory: number
  specs: SKUS_SPECS[]
  price: string
  oldPrice: string
}
export type SKUS_SPECS = { valueName: string, name: string }
export interface PRODUCT_DETAILS {
  categories: PARENT[]
  name: string
  age: string
  mainPictures: string[]
  desc: string
  price: string
  oldPrice: string
  userAddresses: USER_ADDRESSES<string>[]
  specs: SPECS[]
  skus: SKUS[]
  inventory: number
  id: string
  commentCount: string
}

//评价列表
export interface COMMENT_LIST {
  items: COMMENT_LIST_ITEM[];
}
export interface COMMENT_LIST_ITEM {
  id: number
  member: { id: string, nickname: string, avatar: string }
  orderInfo: {specs: { name: string; nameValue: string }[]}
  score: number
  content: string
  createTime: string
  praiseCount: number
  pictures: string[]
}
