const app = getApp();

var config = {
  data: {
    disable: false,
    toolList: [{ 'name': '圣诞帽', 'color': '#32CD32', 'page': 'hat' },
     { 'name': '明星举牌', 'color': '#006400', 'page': 'star' },
    // { 'name': '猜成语', 'color': '#000000', 'page': 'chengyu' },
      // { 'name': '天气情况', 'color': '#CD5C5C', 'page': 'weather' }
    ]
  },

  onLoad: function () {
    var that = this;
    setTimeout(function () {
      if (app.globalData.nickname == '') {
        wx.navigateTo({
          url: '/pages/grant/grant',
        })
      }
    }, 4000);
  },
  onReady: function () {
    // 页面渲染完毕
  },
  onShow: function () {
    // 页面展示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
};

//设置属性名"startName"到相应游戏页面的映射
config.data.toolList.forEach(function (v) {
  config['start' + v.page] = function () {

    config.data.disable = true;

    // 这里需要注意每个游戏文件夹名称需和js名称保持一致
    wx.navigateTo({
      url: '../' + v.page + '/' + v.page
    })
  }
});

Page(config);
