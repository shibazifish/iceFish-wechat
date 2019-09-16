// pages/baby/baby.js

const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    babyList:["哼哼","哈哈"],
    activityList:["奶粉","母乳","便便","嘘嘘","药药","尿片"],
    babyActiveList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBabyActive();
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
  onAddActive:function(e){
    let babyName = e.currentTarget.dataset['baby'];
    let activityName = e.currentTarget.dataset['active'];
    let that = this;
    wx.showLoading({
      title: '保存中。。。',
    });
    util.request(api.BabyActiveAdd, 
    { "babyName": babyName,
     "activeName": activityName,
        "openId": app.globalData.openid
      }, 'POST').then(function (res) {
        wx.hideLoading();
        that.queryBabyActive();
    });
  },
  /**
   * 获取宝宝观测记录
   */
  queryBabyActive: function () {
    let that = this;
    util.request(api.QueryBabyActive, { openId: app.globalData.openid }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          babyActiveList: util.formatJsonTime(res.data, ['activeDate']),
        });
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})