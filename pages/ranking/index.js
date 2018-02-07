let API = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actityNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('分享结果：',res)
    // }
    return {
      // 我报名今晚的羽毛球活动，就差你了！
      title: '浪子神剑 邀请你来打羽毛球(2月2日,星期一,晚上20：00-22：00),目前已报3人，活动火热报名中……',
      path: '/pages/ranking/index?id=123',
      imageUrl:'/assets/baoming.jpg',
      success: function (res) {
        // 转发成功
        console.log('成功',res); 
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });

        wx.getShareInfo({
          shareTicket: 'aaa',
          success: function(res){
            console.log(res.errMsg);
            console.log(res.encryptedData);
            console.log(res.iv);
          }
        });
        console.log(222);
      },
      fail: function (res) {
        // 转发失败
        console.log('失败');
      }
    }
  },
})