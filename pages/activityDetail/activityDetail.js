const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    activity:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      // id: 1181000
    });
    var that = this;
    this.getActivityDetail();
  },

  getActivityDetail: function () {
    let that = this;
    util.request(api.ActivityDetailUrl, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activity: res.data
        });
      }
    });

  },
  onEnter() {
    let that = this;
    util.request(api.EnterAddUrl, {
      activity_id: that.data.id,
      user_id: app.globalData.openid,
      user_name: app.globalData.nickname
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: '报名成功',
          icon:'success',
          duration:2000,
          success:function(){
            setTimeout(
              function () {
                wx.switchTab({
                  url: '../activity/activity',
                });
              },2000
            )
          }
        })
      }
      console.log(res)
    });
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