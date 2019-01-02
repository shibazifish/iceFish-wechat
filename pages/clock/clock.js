// pages/clock/clock.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const comm = require('../../comm.js');
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
    clockInfo:'',
    wechatUser: '',
    posterColor: '',
    posterTimeColor: '',
    posterDataColor: '',
    posterInfoColor: '',
    posterTitle:'博学而不穷，笃行而不倦。',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(function () {
    //   if (app.globalData.nickname == '') {
    //     wx.navigateTo({
    //       url: '/pages/grant/grant'
    //     })
    //   }
    // }, 4000);
    this.getClockInfo(false);
  },
  /**
  * 获取奖品信息 2018年11月27日20:11:24
  */
  getClockInfo: function (isGoto) {
    wx.showLoading({
      title: '数据加载中...',
    })
    let that = this;
    util.request(api.ClockInfoUrl, { open_id: app.globalData.openid, }).then(function (res) {
      wx.hideLoading();
      if (res.errno === 0) {
        that.setData({
          clockInfo: util.formatJsonTime(res.data.clock,'create_time'),
          wechatUser: res.data.wechatUser,
          posterColor: res.data.colorMap.POSTER_COLOR,
          posterTimeColor: res.data.colorMap.POSTER_TIME_COLOR,
          posterDataColor: res.data.colorMap.POSTER_DATA_COLOR,
          posterInfoColor: res.data.colorMap.POSTER_INFO_COLOR,
          posterTitle: res.data.colorMap.POSTER_TITLE == undefined ? '博学而不穷，笃行而不倦。' : res.data.colorMap.POSTER_TITLE,
        });
        if(isGoto){//是否跳转海报页面
          wx.navigateTo({
            url: '/pages/poster/poster?runData=' + that.data.wechatUser.countRunData 
              + '&days=' + that.data.clockInfo.length + '&posterColor=' + that.data.posterColor
              + '&posterTimeColor=' + that.data.posterTimeColor + '&posterDataColor=' + that.data.posterDataColor
              + '&posterInfoColor=' + that.data.posterInfoColor + '&posterTitle=' + that.data.posterTitle
              + '&nowRunData=' + that.data.runData,
          })
        }
      }
    });
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
                that.getClockInfo(true);
                wx.hideLoading();
              }
            })
          }else{
            comm.login();
            setTimeout(function () {
              wx.hideLoading();
              wx.showToast({
                title: '打卡失败！',
              })
            }, 4000);
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
  onShareAppMessage: function (ops) {
    return {
      title: '每天走路就能兑礼品啦！',
      imageUrl: 'https://www.taotieshop.club/icefish/poster/taotie.jpg',//图片地址
      path: '/pages/activity/activity?inviter='+app.globalData.openid,// 用户点击首先进入的当前页面
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