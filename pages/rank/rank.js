// pages/rank/rank.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var sliderWidth = 82; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranks: [],
    list: [],
    nav: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    util.request(api.RankInfoUrl).then(function (res) {
      wx.hideLoading();
      if (res.errno === 0) {
        that.setData({
          ranks: res.data.data,
          list: res.data.data.nowRanks
        });
      }
    });
  },
  navList(e) {
    let nav = +e.currentTarget.dataset.nav;
    this.setData({
      nav: nav
    })
    switch (nav) {
      case 1:
        this.setData({
          list: this.data.ranks.nowRanks
        })
        break;
      case 2:
        this.setData({
          list: this.data.ranks.yesterdayRanks
        })
        break;
      case 3:
        this.setData({
          list: this.data.ranks.allRanks
        })
        break;
    }
  },
})