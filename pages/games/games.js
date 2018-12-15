
var config = {
  data: {
    disable: false,
    gameList: ['2048']
  },

  onLoad: function () {
    var that = this;
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
config.data.gameList.forEach(function (v) {
  config['start' + v] = function () {

    config.data.disable = true;

    // 这里需要注意每个游戏文件夹名称需和js名称保持一致
    wx.navigateTo({
      url: '../' + v + '/' + v
    })
  }
});

Page(config);
