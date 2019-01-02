var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function () {
    //获取用户的登录信息
    var that = this;
    wx.login({
      success: res => {
        that.globalData.code = res.code
        util.request(api.UserLoginUrl, {
          code: res.code
        }, 'GET').then(function (res) {
          if (res.errno === 0) {
            that.globalData.openid = res.data.openid;
            that.globalData.session_key = res.data.session_key;
            util.request(api.UserInfoUrl, {
              openId: res.data.openid
            }, 'GET').then(function (res) {
              if (res.errno === 0) {
                that.globalData.nickname = res.data.nickName;
                that.globalData.avatarUrl = res.data.avatarUrl;
              }
            });
          }
          console.log(res)
        });
      }
    });
  },
  
  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
    },
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: ''
    },
    token: '',
    openid:'',
    code: '',
    nickname: '',
    avatarUrl: '',
    session_key: '',
    key: 'icefish',
    bgPic: null,
    scale: 1,
    rotate: 0,
    hat_center_x: 0,
    hat_center_x: 0,
    currentHatId: 1
  }
})