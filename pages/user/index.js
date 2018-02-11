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
    activeLists: {
      '2018': [
        {
          year: '2018',
          month: '01－05',
          week: 1,
          title: '放飞心情',
          address: '圳宝羽毛球馆1',
          people: 10,
          startDate: '',
          startTime: '',
          addTime: ''
        },
        {
          year: '2018',
          month: '02－05',
          week: 1,
          title: '放飞心情',
          address: '圳宝羽毛球馆2',
          people: 10,
          startDate: '',
          startTime: '',
          addTime: ''
        },
        {
          year: '2017',
          month: '03－05',
          week: 1,
          title: '放飞心情',
          address: '圳宝羽毛球馆3',
          people: 10,
          startDate: '',
          startTime: '',
          addTime: ''
        },
        {
          year: '2017',
          month: '05－05',
          week: 1,
          title: '放飞心情',
          address: '圳宝羽毛球馆4',
          people: 10,
          startDate: '',
          startTime: '',
          addTime: ''
        }
      ],
      '2017': [
        {
          year: '2017',
          month: '01－05',
          week: 1,
          title: '放飞心情',
          address: '圳宝羽毛球馆1',
          people: 10,
          startDate: '',
          startTime: '',
          addTime: ''
        }
      ]
    },
    myAactiveLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = wx.getStorageSync('userInfo').openid;
    let that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    // 获取发布的数据
    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityList&openid=${openid}`,
      method: 'GET',
      success(result) {
        that.setData({
          'myAactiveLists': result.data
        });
        console.log(result.data);
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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

})