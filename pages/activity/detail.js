// pages/activity/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '2018-01-01',
    startTime: '09:55',
    endDate: '2018-01-08',
    endTime: '11:55',
    closeDate: '2018-01-07',
    closeTime: '9:55',
    address: '圳宝羽毛球馆',
    people: 15,
    tel: '15888888888',
    remark: '每个人要自带拍子哦！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111);
    wx.showTabBar({
      success: function(){
        console.log(222);
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
  
  }
})