let util = require('../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    subject: '',
    startDate: util.formatTime(new Date, 1),
    startTime: util.formatTime(new Date, 2),
    endDate: util.formatTime(new Date, 1),
    endTime: util.formatTime(new Date, 2),
    closeDate: util.formatTime(new Date, 1),
    closeTime: util.formatTime(new Date, 2),
    address: '',
    people: '',
    tel: '',
    remark: ''
  },
  //事件处理函数
  bindViewTap: function () {
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
  getUserInfo: function (e) {
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
    let openid = wx.getStorageSync('userInfo').openid;

    let obj = {
      openid: openid,
      subject: this.data.subject,
      startDate: this.data.startDate,
      startTime: this.data.startTime,
      endDate: this.data.endDate,
      endTime: this.data.endTime,
      closeDate: this.data.closeDate,
      closeTime: this.data.closeTime,
      address: this.data.address,
      people: this.data.people,
      tel: this.data.tel,
      remark: this.data.remark
    }

    // wx.setStorage({
    //   key: 'enrollInfo',
    //   data: obj,
    //   success: function () {
        wx.request({
          url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityAdd`,
          data: obj,
          method: 'POST',
          success(result) {
            console.log(result);
            wx.showModal({
              title: '活动发布成功',
              showCancel: false,
              content: "活动已成功发布，您可转发到群里，约他们一起打球吧！",
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/activity/detail?id=' + result.data._id
                  })
                }
              }
            })
          }
        });
    //   }
    // });
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

  inputSubject(e) {
    this.setData({
      subject: e.detail.value
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
  },

  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  }
})
