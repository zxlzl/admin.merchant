export enum idType {
  身份证 = 1,
  港澳居民来往内地通行证,
  台湾居民来往大陆通行证,
  香港身份证,
  台湾身份证,
  澳门身份证,
  外国人身份证件,
  中国护照,
  外国人永久居留证
}

export enum validTypeEnum {
  全免=1,
  仅限年龄准入
}

export enum authType {
  三要素 = 3,
  四要素
}

export enum status {
  认证成功,
  认证失败
}

export enum signSource {
  微信签约,
  开放平台,
  线下
}

// 签约状态
export enum signStatus {
  I = '待签约',
  CG = '签约中',
  S = '签约成功',
  F = '签约失败'
}

export enum checkStatus {
  审核中,
  审核通过,
  审核拒绝,
  已撤销
}

export enum applySource {
  商户申请,
  微信申请,
  后台申请
}

export enum sex {
  男,
  女,
  未知
}


