//获取应用实例
const app = getApp()

Page({
  data: {
    startDate: '2018-01-01',
    startTime: '09:55',
    endDate: '2018-01-08',
    endTime: '11:55',
    closeDate: '2018-01-07',
    closeTime: '9:55',
    address:'圳宝羽毛球馆',
    people: 0,
    tel:'',
    remark: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (scene) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 发布活动
   */
  publish: function () {
    let obj = {
      address: this.data.address,
      people: this.data.people,
    }

    console.log(obj)
    wx.showModal({
      title: '活动发布成功',
      showCancel: false,
      content: "活动已成功发布，您可转发到群里或者转发给好友，约他们一起打球吧！",
      success: function (res){
        if (res.confirm){
          wx.navigateTo({
            url: '/pages/activity/detail?dataObj=' + JSON.stringify(obj)
          })
        }
      }
    })
  },

  /**
   * 更改开始日期
   */
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  /**
  * 更改结束日期
  */
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  /**
   * 更改开始时间
   */
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  /**
  * 更改结束时间
  */
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  /**
   * 更改截止时间
   */
  closeDateChange(e) {
    this.setData({
      closeDate: e.detail.value
    })
  },

  /**
  * 更改截止时间
  */
  closeTimeChange(e) {
    this.setData({
      closeTime: e.detail.value
    })
  },

  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },

  inputPeople(e) {
    this.setData({
      people: e.detail.value
    })
  },

  inputTel(e) {
    this.setData({
      tel: e.detail.value
    })
  }
})
