const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId : "",
    inviter:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.inviter = '112233';
    let that = this;
    // 页面初始化 options为页面跳转所带来的参数
    if (options.inviter != undefined) {
      that.setData({
        inviter: options.inviter,
      })
      console.log("inviter1:" + options.inviter);
    }
  },

  bindGetUserInfo(e) {
    let that = this;
    if (e.detail.userInfo) {//如果用户授权
      app.globalData.nickname = e.detail.userInfo.nickName,
      wx.showLoading({
        title: '授权中...',
      });
      util.request(api.UserAddUrl, {
        openId: app.globalData.openid,
        nickName: e.detail.userInfo.nickName,
        gender: e.detail.userInfo.gender,
        avatarUrl: e.detail.userInfo.avatarUrl,
        province: e.detail.userInfo.province,
        country: e.detail.userInfo.country,
        city: e.detail.userInfo.city,
        inviter: that.data.inviter
      }, 'POST').then(function (res) {
        wx.hideLoading();
        if (res.errno === 0) {
          wx.switchTab({
            url: '../activity/activity',
          });
        }else{
          wx.showToast({
            title: '授权失败！',
          })
        }
        console.log(res)
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})