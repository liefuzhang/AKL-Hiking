let API = require('../../utils/api.js');
let Data = require('../../utils/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    closeDate: '',
    closeTime: '',
    address: '',
    people: '',
    tel: '',
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {
    // let dataObj = options.dataObj === undefined ? {} : JSON.parse(options.dataObj);
    // this.setData({
    //   people: dataObj.people,
    //   address: dataObj.address,

    // });
    let _this = this;

    API.ajax(Data.activityDetail, function(res){
      console.log(res);
      _this.setData(res.data)
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