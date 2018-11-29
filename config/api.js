const ApiRootUrl = 'http://127.0.0.1:8082/icefish/wechat/';

module.exports = {
  ImageShowUrl : 'http://127.0.0.1:8082/icefish/',//图片显示
  ActivityInfoUrl:ApiRootUrl+'activity/info',//活动信息
  ActivityDetailUrl: ApiRootUrl + 'activity/query',//活动明细信息
  EnterAddUrl: ApiRootUrl + 'enter/add',//报名
  UserAddUrl: ApiRootUrl + 'user/add',//插入微信用户信息
  ImageAddUrl: ApiRootUrl + 'image/upload', //图片上传
};