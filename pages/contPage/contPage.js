// pages/contPage/contPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    canvasWidth: '',
    canvasHeight: '',
    fontColor:'#FFD700',
    colorList: ["#0000FF", "#87CEEB", "#FFFF00", "#FFFFFF", "#000000", "#3CB371", "#20B2AA", "#87CEEB", "#191970","#FFD700"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getImageInfo({
      src: app.globalData.bgPic,
      success: res => {
        var canvasWidth = res.width *2;
        var canvasHeight = res.height *2;
        this.setData({
          bgPic: res.path,
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight
        });
        this.drawBg();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  drawBg:function(){
    var that = this;
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('firstCanvas');
    ctx.save();
    // ctx.clearRect(0, 0, 180, 180);
    // ctx.beginPath();
    // ctx.arc(88, 88, 88, 0, Math.PI * 2, false);
    // ctx.clip();
    // ctx.drawImage(that.data.bgPic, 0, 0, 360);
    //从指定位置裁剪原始图片指定宽高，从指定位置开始显示到画布上指定宽高：
    ctx.drawImage(that.data.bgPic, 0, 0, that.data.canvasWidth, that.data.canvasHeight, 0, 0, 360, 360);
    ctx.beginPath();
    ctx.arc(88, 88, 88, 0, Math.PI * 2, true);
    ctx.rect(0,0,360,360);
    ctx.setFillStyle("white");
    ctx.fill();
    ctx.restore();
    ctx.drawImage('/static/images/contBg.png', 125, 125, 50, 50);
    ctx.draw();
  },
  bindKeyInput(e) {
    var that = this;
    var ctx = wx.createCanvasContext('firstCanvas');
    // ctx.clearRect(0, 0, 180, 180);
    ctx.save();
    // ctx.beginPath();
    // ctx.arc(88, 88, 88, 0, Math.PI * 2, false);
    // ctx.clip();
    // ctx.drawImage(that.data.bgPic, 0, 0, 360);
    //从指定位置裁剪原始图片指定宽高，从指定位置开始显示到画布上指定宽高：
    ctx.drawImage(that.data.bgPic, 0, 0, that.data.canvasWidth, that.data.canvasHeight, 0, 0, 360, 360); ctx.beginPath();
    ctx.arc(88, 88, 88, 0, Math.PI * 2, true);
    ctx.rect(0, 0, 360, 360);
    ctx.setFillStyle("white");
    ctx.fill();
    ctx.restore();
    ctx.drawImage('/static/images/contBg.png', 125, 125, 50, 50);
    ctx.setFontSize(26);
    ctx.setFillStyle(that.data.fontColor);
    ctx.fillText(e.detail.value, 140, 160);
    ctx.draw();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  exchange:function(){
    var that = this;
    that.setData({
      fontColor:that.data.colorList[Math.floor(Math.random() * 10)],
    });
  },
  onClick: function () {
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