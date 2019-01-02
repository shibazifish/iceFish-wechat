var api = require('./config/api.js');
const util = require('./utils/util.js');
const app = getApp()

/**
 * 调用微信登录
 */
function login() {
  wx.login({
    success: res => {
      app.globalData.code = res.code
      util.request(api.UserLoginUrl, {
        code: res.code
      }, 'GET').then(function (res) {
        if (res.errno === 0) {
          app.globalData.openid = res.data.openid;
          app.globalData.session_key = res.data.session_key;
          util.request(api.UserInfoUrl, {
            openId: res.data.openid
          }, 'GET').then(function (res) {
            if (res.errno === 0) {
              app.globalData.nickname = res.data.nickName;
              app.globalData.avatarUrl = res.data.avatarUrl;
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
}

module.exports = {
  login,
}


