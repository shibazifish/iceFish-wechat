// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backImg:"../../static/images/taotie.jpg",
    miniImg: "../../static/images/mini1.jpg",
    icefishImg: "../../static/images/icefish.png",
    days:"365",
    runData: "99999",
    clockInfo:'',
    wechatUser:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '专属海报生成中...',
    })
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      days: options.days,
      runData: options.runData,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('firstCanvas')
    var windH = wx.getSystemInfoSync().windowHeight;
    var windW = wx.getSystemInfoSync().windowWidth;
    ctx.save();
    ctx.setFillStyle('#ECC542');
    ctx.fillRect(0, 0, windW, windH);
    ctx.drawImage(that.data.backImg, 0, 0, windW, windH -90);
    ctx.drawImage(that.data.miniImg,windW -85, windH - 85, 80,80);
    ctx.drawImage(that.data.icefishImg, 10, windH - 70, 60, 60);
    ctx.restore();
    ctx.setTextAlign('left');
    ctx.setFontSize(14);
    ctx.fillText('冰鱼运动', 80, windH - 40);
    ctx.setFontSize(10);
    ctx.fillText('长按识别二维码进入活动', 80, windH-20);
    //提示信息
    ctx.setTextAlign('left');
    ctx.setFillStyle('white')
    ctx.setFontSize(24);
    ctx.fillText('我已在冰鱼运动累计打卡' + that.data.days + '天', 10, 60);
    ctx.setFontSize(12);
    ctx.fillText('累计' + that.data.runData + '步', 10, 80);
    ctx.draw();
    wx.hideLoading();
  },
  onClick:function () {
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        fileType: 'jpg',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '快与小伙伴们分享吧！',
              });
            },
            fail() {
              wx.hideLoading()
            }
          })
        }
      })
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