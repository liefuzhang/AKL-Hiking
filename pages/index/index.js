let API = require('../../utils/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: [],
    loaded: false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow: function () {
    app.globalData.activityId = null;

    this.getAllActivities();
  },
  onPullDownRefresh: function () {
    this.getAllActivities(wx.stopPullDownRefresh);
  },
  getAllActivities: function (callback) {
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}activity/getall`,
      method: 'GET',
      success(res) {
        _this.setData({
          activities: res.data,
          loaded: true
        });
        if (callback)
          callback();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log('分享结果：', res)
    // }
    return {
      title: '邀请你参加AKL活动',
      path: '/pages/index/index',
      imageUrl: 'https://raw.githubusercontent.com/liefuzhang/AKL-Hiking/master/assets/Sky-tower.jpg'
    }
  },

  viewActivity: function (event) {
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + event.currentTarget.dataset.id
    })
  }
})