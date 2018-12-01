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
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
            that.globalData.session_key = res.data.session_key;
          }
        })
      }
    });
  },
  
  globalData: {
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
    openid:'',
    code: '',
    nickname: '',
    session_key: '',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4375865120f60592&secret=bdf2056097e96b3124ac43399fa2fdd2&js_code=',
    wx_url_2: '&grant_type=authorization_code',
  }
})