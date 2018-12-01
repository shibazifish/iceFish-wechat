//const ApiRootUrl = 'http://127.0.0.1:8082/icefish/wechat/';
const ApiRootUrl = 'https://www.taotieshop.club/icefish/wechat/';

module.exports = {
  ImageShowUrl : 'http://127.0.0.1:8082/icefish/',//图片显示
  GoodsInfoUrl:ApiRootUrl+'prize/info',//奖品信息
  GoodsDetailUrl: ApiRootUrl + 'prize/query',//奖品明细信息
  EnterAddUrl: ApiRootUrl + 'exchange/add',//兑换奖品
  UserAddUrl: ApiRootUrl + 'user/add',//插入微信用户信息
  ImageAddUrl: ApiRootUrl + 'image/upload', //图片上传
  ClockAddUrl: ApiRootUrl + 'clock/add',//保存跑步信息
};