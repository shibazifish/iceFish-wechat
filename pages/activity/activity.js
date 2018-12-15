const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:[],
    inviter:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.inviter != undefined) {
      that.setData({
        inviter: options.inviter,
      })
      console.log("inviter:" + options.inviter);
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    this.getGoodsInfo();
    setTimeout(function () {
      if (app.globalData.nickname == '') {
        wx.navigateTo({
          url: '/pages/grant/grant?inviter='+that.data.inviter,
        })
      }
    }, 4000);
  },
  /**
   * 获取奖品信息 2018年11月27日20:11:24
   */
  getGoodsInfo:function(){
    let that = this;
    util.request(api.GoodsInfoUrl).then(function (res) {
      wx.hideLoading();
      if (res.errno === 0) {
        that.setData({
          goodsInfo: res.data,
        });
      }
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
    return {
      title: '每天走路就能兑礼品啦！',
      imageUrl: 'https://www.taotieshop.club/icefish/poster/taotie.jpg',//图片地址
      path: '/pages/activity/activity?inviter=' + app.globalData.openid,// 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  }
})