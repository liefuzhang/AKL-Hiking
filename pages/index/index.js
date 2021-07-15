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
    app.globalData.activityId = null;

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShow: function () {
    this.getAllActivities();
  },
  onPullDownRefresh: function () {
    this.getAllActivities();
  },
  getAllActivities: function () {
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}activity/getall`,
      method: 'GET',
      success(res) {
        _this.setData({
          activities: res.data,
          loaded: true
        });
        console.log(res.data);
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
      // 我报名今晚的羽毛球活动，就差你了！
      title: '浪子神剑 邀请你来打羽毛球(2月2日,晚上20：00-22：00),目前已报3人，活动火热报名中……',
      path: '/pages/activity/detail?id=5a812c54b54ca0101a9c2040',
      imageUrl: '/assets/baoming.jpg',
      success: function (res) {
        // 转发成功
        console.log('成功', res);
        // 获取分享到的信息
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (result) {
            console.log(result)
          }
        })

      },
      fail: function (res) {
        // 转发失败
        console.log('失败');
      }
    }
  },

  viewActivity: function (event) {
    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/activity/detail?id=' + event.currentTarget.dataset.id
    })
  }
})