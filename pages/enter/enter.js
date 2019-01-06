// pages/enter/enter.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:0,
    nickname: '',
    avatarUrl: '',
    openid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (app.globalData.nickname == '') {
      wx.navigateTo({
        url: '/pages/grant/grant',
      })
    }else{
      this.setData({
        activity_id: parseInt(options.id),
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl,
        openid: app.globalData.openid,
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

  },
  /**
   * 表单提交
   */
  formSubmit(e) {
    let that = this;
    let enterData = e.detail.value;
    //ActivityAddUrl
    util.request(api.EnterAddUrl, enterData, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(
              function () {
                wx.navigateTo({
                  url: '/pages/activityDetail/activityDetail?id=' + enterData.activity_id,
                })}, 1600
            )
          }
        })
      } else {//新增失败
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})