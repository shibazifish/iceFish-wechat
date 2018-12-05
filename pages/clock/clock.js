// pages/clock/clock.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData: '',
    iv: '',
    runData:0,
    iceData:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetRunData() {
    //获取用户的登录信息
    var that = this;
    wx.showLoading({
      title: '信息获取中...',
    })
    wx.getWeRunData({
      success: res => {
        that.data.encryptedData = res.encryptedData;
        that.data.iv = res.iv;
        wx.hideLoading();
        wx.showLoading({
          title: '信息同步中...',
        })
        util.request(api.ClockAddUrl, {
          encryptedData: that.data.encryptedData,
          iv: that.data.iv,
          session_key: app.globalData.session_key,
          open_id: app.globalData.openid
        }, 'POST').then(function (res) {
          if (res.errno === 0) {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                that.setData({
                  runData : res.data.run_data,
                  iceData:res.data.ice_data
                });
                wx.hideLoading();
              }
            })
          }
          console.log(res)
        });
      }
    });
  },

onSaveRunData:function(){
  let that = this;
  util.request(api.ClockAddUrl, {
    encryptedData: that.data.encryptedData,
    iv: that.data.iv,
    session_key: app.globalData.session_key
  }, 'POST').then(function (res) {
    if (res.errno === 0) {
      wx.showToast({
        title: '打卡成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          that.setDat({
            runData : res.data
          })
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