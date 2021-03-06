const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    prize: {},
    exchangeResult: '',
    exchangeRecord: '',
    nickname: app.globalData.nickname,
    avatarUrl: app.globalData.avatarUrl
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
    this.getPrizeDetail();
    this.getExchangeInfo();
  },
  /**
   * 获取奖品明细
   */
  getPrizeDetail: function () {
    let that = this;
    util.request(api.GoodsDetailUrl, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          prize: res.data
        });
      }
    });
  },
  /**
   * 获取兑奖历史记录
   */
  getExchangeInfo: function () {
    let that = this;
    util.request(api.ExchangeInfoUrl, { prizeId: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          exchangeRecord: util.formatJsonTime(res.data, ['create_date']),
        });
      }
    });
  },
  onEnter() {
    let that = this;
    util.request(api.ExchangeAddUrl, {
      goods_id: that.data.id,
      open_id: app.globalData.openid,
      user_name: app.globalData.nickname
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(
              function () {
                var timestamp = Date.parse(new Date());
                that.setData({
                  exchangeResult: '兑换码:' + app.globalData.openid + timestamp + '\n点击复制兑换码，联系客服兑换！',
                })
              }, 2000
            )
          }
        })
      } else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
      console.log(res)
    });
  },
  /**
   * 点击复制文字
   */
  copyText: function (e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.exchangeResult,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            that.setData({
              exchangeResult: '',
            })
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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
      title: '快帮我拆一下这个红包！',
      imageUrl: '../../static/images/hongbao.jpg',
      path: '/pages/prize/prize?inviter=' + app.globalData.openid,// 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
})