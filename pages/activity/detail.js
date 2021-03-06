//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    id: '',
    name: '',
    date: new Date(),
    startTime: '',
    location: '',
    description: '',
    hikerList: [],
    waitingList: [],
    alreadyEnrolled: false,
    loaded: false,
    canIUseGetUserProfile: false,
    isAdmin: false,
    helpEnrollCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    this.setData({
      isAdmin: app.globalData.isAdmin
    })

    let id = options.id || '';
    let _this = this;

    wx.showShareMenu({
      withShareTicket: true
    });

    this.getEnrollData(id);
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
    wx.showShareMenu({
      withShareTicket: true
    });

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
    this.getEnrollData(this.data.activity.id, wx.stopPullDownRefresh);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onNavigateToHome: function () {
    wx.navigateBack({
      changed: true
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '邀请你参加AKL活动',
      path: '/pages/activity/detail?id=' + this.data.activity.id,
      imageUrl: 'https://raw.githubusercontent.com/liefuzhang/AKL-Hiking/master/assets/Sky-tower.jpg'
    }
  },

  // 我要报名
  onEnroll: function () {
    if (app.globalData.userRegistered) {
      this.enrollForActivity();
    } else {
      this.getUserProfile(this.enrollForActivity)
    }
  },

  onHelpEnrollPlus: function () {
    if (this.data.helpEnrollCount == 6) {
      wx.showToast({
        title: '最多帮6位朋友报名',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.data.helpEnrollCount += 1;
    this.helpEnrollForActivity();
  },
  onHelpEnrollMinus: function () {
    this.data.helpEnrollCount -= 1;
    this.helpEnrollForActivity();
  },
  helpEnrollForActivity: function () {
    var _this = this;
    wx.request({
      url: `${app.globalData.apiUrl}activity/helpEnroll`,
      data: {
        hikerId: app.globalData.hikerId,
        activityId: _this.data.activity.id,
        helpEnrollCount: _this.data.helpEnrollCount
      },
      method: 'POST',
      success: function () {
        _this.getEnrollData(_this.data.activity.id);
      }
    });
  },

  enrollForActivity: function () {
    var _this = this;
    wx.request({
      url: `${app.globalData.apiUrl}activity/enroll`,
      data: {
        hikerId: app.globalData.hikerId,
        activityId: _this.data.activity.id
      },
      method: 'POST',
      success(result) {
        _this.getEnrollData(_this.data.activity.id);
      }
    });
  },

  onCancelEnrollment: function () {
    let _this = this;
    wx.showModal({
      title: '确定取消',
      showCancel: true,
      content: "确定取消报名?",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.apiUrl}activity/cancelEnrollment`,
            data: {
              hikerId: app.globalData.hikerId,
              activityId: _this.data.activity.id
            },
            method: 'POST',
            success(result) {
              _this.getEnrollData(_this.data.activity.id);
            }
          });
        }
      }
    })
  },

  getEnrollData(id, callback) {
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}activity/get/${id}`,
      method: 'GET',
      success(res) {
        let activity = res.data;
        _this.setData({
          activity: activity,
          hikerList: activity.hikers.slice(0, activity.waitingListIndex + 1),
          waitingList: activity.hikers.slice(activity.waitingListIndex + 1),
          alreadyEnrolled: activity.hikers && activity.hikers.some(h => h.id === app.globalData.hikerId),
          helpEnrollCount: activity.hikers && activity.hikers.some(h => h.id === app.globalData.hikerId) && activity.hikers.filter(h => h.id === app.globalData.hikerId)[0].helpEnrollCount,
          loaded: true
        });
        if (callback)
          callback();
      }
    });
  },

  getUserProfile(callback) {
    var _this = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        _this.register(res.userInfo, callback);
      }
    })
  },
  register: function (userInfo, callback) {
    var _this = this;
    wx.request({
      url: `${app.globalData.apiUrl}account/register?openid=${app.globalData.openid}`,
      data: userInfo,
      method: 'POST',
      success(result) {
        console.log('用户login成功：', result)

        app.globalData.membershipId = result.data.membershipId;
        app.globalData.hikerId = result.data.id;
        app.globalData.avatarUrl = result.data.avatarUrl;
        app.globalData.userRegistered = true;

        callback();
      }
    })
  },

  copyToClipboard: function (event) {
    var _this = this;
    wx.setClipboardData({
      data: event.currentTarget.dataset.text
    });
  }
})