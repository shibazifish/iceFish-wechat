// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false
  },

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  getAvatar() {
    if (app.globalData.avatarUrl) {
      this.setData({
        bgPic: app.globalData.avatarUrl,
      });
      this.assignPicChoosed();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.navigateTo({
        url: '/pages/grant/grant?back=true',
      })
    }
  },
  chooseImage(from) {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic: res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res) => {
        this.assignPicChoosed();
      },
      complete: (res) => {
        this.assignPicChoosed();
      },
    })
  },
  nextPage() {
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '送你一顶圣诞帽！',
      imageUrl: '../../image/1.png',
      path: '/pages/tools/tools',// 用户点击首先进入的当前页面
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