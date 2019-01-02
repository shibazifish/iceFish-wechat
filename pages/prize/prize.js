// pages/prize/prize.js 奖品展示界面 
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
    goodsInfo: [], 
    inviter: '', 
    notice: '每周三补充库存', 
    marqueePace: 1,//滚动速度 
    marqueeDistance: 0,//初始滚动距离 
    marqueeDistance2: 0, 
    marquee2copy_status: false, 
    marquee2_margin: 60, 
    size: 14, 
    orientation: 'left',//滚动方向 
    interval: 20 // 时间间隔 
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
          url: '/pages/grant/grant?inviter=' + that.data.inviter, 
        }) 
      } 
    }, 4000); 
  }, 
  /** 
   * 获取奖品信息 2018年11月27日20:11:24 
   */ 
  getGoodsInfo: function () { 
    let that = this; 
    util.request(api.GoodsInfoUrl).then(function (res) { 
      wx.hideLoading(); 
      if (res.errno === 0) { 
        if (res.data.notice == undefined) { 
          that.setData({ 
            goodsInfo: res.data, 
          }); 
        } else { 
          that.setData({ 
            goodsInfo: res.data.prize, 
            notice: res.data.notice.para_value, 
          }); 
        } 
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
  onShow: function () { 
    // 页面显示 
    var vm = this; 
    var length = vm.data.notice.length * vm.data.size;//文字长度 
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度 
    vm.setData({ 
      length: length, 
      windowWidth: windowWidth, 
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白 
    }); 
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动 
    vm.run2();// 第一个字消失后立即从右边出现 
  }, 
  run1: function () { 
    var vm = this; 
    var interval = setInterval(function () { 
      if (-vm.data.marqueeDistance < vm.data.length) { 
        vm.setData({ 
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace, 
        }); 
      } else { 
        clearInterval(interval); 
        vm.setData({ 
          marqueeDistance: vm.data.windowWidth 
        }); 
        vm.run1(); 
      } 
    }, vm.data.interval); 
  }, 
  run2: function () { 
    var vm = this; 
    var interval = setInterval(function () { 
      if (-vm.data.marqueeDistance2 < vm.data.length) { 
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示 
        vm.setData({ 
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace, 
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin, 
        }); 
      } else { 
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时 
          vm.setData({ 
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动 
          }); 
          clearInterval(interval); 
          vm.run2(); 
        } else { 
          clearInterval(interval); 
          vm.setData({ 
            marqueeDistance2: -vm.data.windowWidth 
          }); 
          vm.run2(); 
        } 
      } 
    }, vm.data.interval); 
  } 
})