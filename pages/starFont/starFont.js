// pages/starFont/starFont.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    starInfo:'',
    leftW:'',
    tempPath:'',
    fontInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: parseInt(options.id)
    });
    this.getStarDetail();
  },
  /**
     * 获取奖品明细
     */
  getStarDetail: function () {
    let that = this;
    util.request(api.StarDetailUrl, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        var windW = wx.getSystemInfoSync().windowWidth;
        var leftW = windW - res.data.img_width/2;
        that.setData({
          starInfo: res.data,
          leftW: leftW+'rpx',
        });
        that.getBGImg();
      }
    });
  },
  getBGImg:function(){
    var that = this;
    console.info('get img');
    wx.getImageInfo({
      src: that.data.starInfo.star_img,
      success: res => {
        that.setData({
          tempPath:res.path
        })
        that.drawBg();
      }
    })
  },
  drawBg: function () {
    var that = this;
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('firstCanvas');
    console.info(that.data.tempPath);
    ctx.drawImage(that.data.tempPath, 0, 0, that.data.starInfo.img_width/2, that.data.starInfo.img_height/2);
    ctx.draw();
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
  bindKeyInput(e) {
    this.setData({
      fontInfo: e.detail.value
    })
  },
  bindSubmit() {
    var that = this;
    var ctx = wx.createCanvasContext('firstCanvas');
    ctx.save();
    //从指定位置裁剪原始图片指定宽高，从指定位置开始显示到画布上指定宽高：
    ctx.drawImage(that.data.tempPath, 0, 0, that.data.starInfo.img_width / 2, that.data.starInfo.img_height / 2);
    ctx.restore();

    ctx.save();
    ctx.translate(that.data.starInfo.font_width, that.data.starInfo.font_height);
    ctx.rotate(Math.PI / that.data.starInfo.font_angle);
    ctx.setFontSize(18);
    ctx.setFillStyle(that.data.starInfo.font_color);

    //文字换行
    var chr = that.data.fontInfo.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    for (var a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < that.data.starInfo.maxWidth) {
        temp += chr[a];
      }
      else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);
    for (var b = 0; b < that.data.starInfo.maxHeight; b++) {
      if (row[b]) {
        ctx.fillText(row[b], 0, 28 * b, that.data.starInfo.maxWidth);
      }
    }
    ctx.restore();

    ctx.drawImage('/static/images/mini1.jpg', 0, 0, 308, 308, that.data.starInfo.img_width / 2 - 55, that.data.starInfo.img_height / 2 - 60, 35, 35);
    ctx.draw();
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