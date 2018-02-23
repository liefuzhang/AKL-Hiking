let API = require('../../utils/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actityNum: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('排行榜');
    console.log('进来的值：', options);
    wx.showShareMenu({
      withShareTicket: true
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    console.log('首页显示');
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
          success: function(result){
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

  getUserInfo: function(){
    console.log('手动获取用户信息。。。')
  }
})