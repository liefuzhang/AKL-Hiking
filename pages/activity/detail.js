// let API = require('../../utils/api.js');
// let Data = require('../../utils/data.js');

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    subject: '',
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
    let id = options.id || '';
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityInfo&id=${id}`,
      method: 'GET',
      success(result) {
        _this.setData(result.data);
        console.log(result);
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
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log('分享结果：', res)
    // }
    return {
      // 我报名今晚的羽毛球活动，就差你了！
      title: '浪子神剑 邀请你来打羽毛球(2月2日,星期一,晚上20：00-22：00),目前已报3人，活动火热报名中……',
      path: '/pages/activity/detail?id=' + this._id,
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

  // 我要报名
  onEnroll: function (id) {
    let openid = wx.getStorageSync('userInfo').openid;
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityEnroll&activityId=${_this.data._id}&openid=${openid}`,
      method: 'GET',
      success(result) {
        if(result.code){

        }

        wx.showModal({
          title: '报名成功！',
          showCancel: false,
          content: "报名成功了，还不分享到群里邀请更多小伙伴来参与！",
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/activity/detail?id=' + res.data.activityId
              })
            }
          }
        })
      }
    });
  },

  // 修改活动
  onEditActivity: function(){
    app.globalData.activityId = this.data._id;

    wx.switchTab({
      url: '/pages/activity/index'
    });
  }
})