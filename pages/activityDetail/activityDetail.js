const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    activity:{},
    enterRecord: '',
    isAuditor:false
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
    if (app.globalData.nickname == '') {
      wx.navigateTo({
        url: '/pages/grant/grant?inviter=' + that.data.inviter,
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
    that.setData({
      id: parseInt(options.id)
      // id: 1181000
    });
    this.getActivityDetail();
    this.getEnterInfo();
  },
  /**
   * 获取活动明细
   */
  getActivityDetail: function () {
    let that = this;
    util.request(api.ActivityQueryUrl, { activityId: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        let newIsAuditor = res.data.creator == app.globalData.openid;
        that.setData({
          activity: util.formatJsonTime([res.data], ['start_time', 'end_time','create_time'])
        [0],
          isAuditor: newIsAuditor,
        });
      }
    });
  },
  /**
   * 获取报名记录
   */
  getEnterInfo: function () {
    let that = this;
    util.request(api.EnterGetUrl, { activity_id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          enterRecord: util.formatJsonTime(res.data, ['create_date']),
        });
      }
    });
  },
  /**
   * 报名
   */
  onEnter() {
    let that = this;
    util.request(api.EnterAddUrl, {
      activity_id: that.data.id,
      creator: app.globalData.openid,
      create_name: app.globalData.nickname,
      avatarUrl: app.globalData.avatarUrl,
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: res.data,
          icon:'success',
          duration:2000,
          success:function(){

          }
        })
      } else{
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
    wx.setClipboardData({
      data: e.currentTarget.id,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 审核报名信息
   */
  onAudit:function(e){
    let that = this;
    util.request(api.EnterAuditUrl, {
      enter_id: e.currentTarget.id,
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000,
          success: function () {
            wx.navigateTo({
              url: '/pages/activityDetail/activityDetail?id='+that.data.id,
            })
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
    var that = this;
    return {
      title: app.globalData.nickname + '邀请你参加' + that.data.activity.activity_name,
      path: '/pages/activityDetail/activityDetail?inviter=' + app.globalData.openid + '&id=' + that.data.id,// 用户点击首先进入的当前页面
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