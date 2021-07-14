var utils = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我参加的活动", "我发布的活动"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    activeLists: [],
    myAactiveLists: [],
    userid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let _this = this;

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });

    this.getActivity();
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
    this.getActivity();
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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  publish: function(){
    wx.switchTab({
      url: '/pages/activity/index'
    });
  },

  // 获取活动信息
  getActivity: function(){
    let _this = this;

    // 获取参加的活动数据
    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=enrollList&userid=${_this.data.userid}`,
      method: 'GET',
      success(result) {
        _this.setData({
          'activeLists': result.data
        });
        console.log(result.data);
      }
    });

    // 获取发布的数据
    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityList&userid=${_this.data.userid}`,
      method: 'GET',
      success(result) {
        _this.setData({
          'myAactiveLists': result.data
        });
        console.log(result.data);
      }
    });
  }
})