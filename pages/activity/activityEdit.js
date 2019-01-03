// pages/activity/activityEdit.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '2019-01-01',
    startTime: '12:01',
    endDate: '2019-01-01',
    endTime: '12:01',
    start_time:'',
    end_time:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 * 绑定日期
 */
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  /**
   * 绑定日期
   */
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 表单提交
   */
  formSubmit(e) {
    let activityData = e.detail.value;
    activityData.start_time = activityData.startDate + " " + activityData.startTime+":00";
    activityData.end_time = activityData.endDate + " " + activityData.endTime + ":00";
    activityData.creator = app.globalData.openid;
    activityData.create_name = app.globalData.nickname;
    //ActivityAddUrl
    util.request(api.ActivityAddUrl, activityData, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 3000,
          success: function () {
            setTimeout(
              wx.navigateTo({
                url: '/pages/activity/activity',
              }), 4200
            )
          }
        })
      }else{//新增失败
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})