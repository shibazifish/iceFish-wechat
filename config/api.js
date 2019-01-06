// const ApiRootUrl = 'http://127.0.0.1:8082/icefish/wechat/';
const ApiRootUrl = 'https://www.taotieshop.club/icefish/wechat/';

module.exports = {
  GoodsInfoUrl:ApiRootUrl+'prize/info',//奖品信息
  GoodsDetailUrl: ApiRootUrl + 'prize/query',//奖品明细信息
  ExchangeAddUrl: ApiRootUrl + 'exchange/add',//兑换奖品
  UserAddUrl: ApiRootUrl + 'user/add',//插入微信用户信息
  UserLoginUrl: ApiRootUrl + 'user/login',//登录微信
  ImageAddUrl: ApiRootUrl + 'image/upload', //图片上传
  ClockAddUrl: ApiRootUrl + 'clock/add',//保存跑步信息
  ClockInfoUrl: ApiRootUrl + 'clock/info',//获取打卡信息
  UserInfoUrl: ApiRootUrl + 'user/get',//获取用户信息
  RankInfoUrl: ApiRootUrl + 'user/rank',//获取排行榜信息
  ExchangeInfoUrl: ApiRootUrl + 'exchange/get',//获取兑换信息
  StarInfoUrl: ApiRootUrl + 'star/info',//获取明星列表
  StarDetailUrl: ApiRootUrl + 'star/query',//获取明星详细
  //活动相关
  ActivityAddUrl: ApiRootUrl + 'activity/add',//新增活动
  ActivityGetUrl: ApiRootUrl + 'activity/get',//获取活动信息
  ActivityQueryUrl: ApiRootUrl + 'activity/query',//查询活动信息
  //报名相关
  EnterAddUrl: ApiRootUrl +'enter/add',//新增报名信息
  EnterGetUrl: ApiRootUrl + 'enter/get',//获取所有报名信息
  EnterInfoUrl: ApiRootUrl + 'enter/info',//通过id获取报名信息
  EnterAuditUrl: ApiRootUrl + 'enter/audit',//审核报名信息
};