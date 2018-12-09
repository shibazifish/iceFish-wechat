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
              } else {
                wx.navigateTo({
                  url: '/pages/grant/grant'
                })
              }
            });
          }
          console.log(res)
        });
      }
    });
  },
  
  globalData: {
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: ''
    },
    token: '',
    openid:'',
    code: '',
    nickname: '',
    session_key: '',
  }
})