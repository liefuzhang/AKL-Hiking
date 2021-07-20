let util = require('../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    id: '',
    type: 0,
    name: '',
    startDate: util.formatTime(new Date, 1),
    startTime: util.formatTime(new Date, 2),
    duration: '',
    location: '',
    countLimit: '',
    level: '',
    description: '',
    files: [],
    headPhotoPath: '',
    types: ['徒步', '羽毛球', '其他'],
    isAdmin: false
  },
  //事件处理函数
  onShow: function () {
    this.setData({
      isAdmin: app.globalData.isAdmin
    })

    let id = app.globalData.activityId || '';
    this.setData({
      id: id
    });
    let _this = this;

    if (id !== '') {
      wx.request({
        url: `${app.globalData.apiUrl}activity/get/${id}`,
        method: 'GET',
        success(res) {
          let activity = res.data;
          _this.setData({
            name: activity.name,
            type: activity.type,
            description: activity.description,
            location: activity.location,
            startDate: activity.dateString,
            startTime: activity.timeString,
            countLimit: activity.countLimit,
            level: activity.level,
            duration: activity.duration,
            headPhotoPath: activity.headPhotoPath
          });
        }
      });
    } else {
      this.setData({
        type: 0,
        name: '',
        startDate: util.formatTime(new Date, 1),
        startTime: util.formatTime(new Date, 2),
        duration: '',
        location: '',
        countLimit: '',
        level: '',
        description: '',
        files: [],
        headPhotoPath: ''
      })
    }
  },
  /**
   * 发布活动
   */
  publish: function () {
    let id = this.data.id;
    let modelTitle = '活动发布成功';
    let obj = {
      id: this.data.id || 0,
      createdByHikerId: app.globalData.hikerId,
      name: this.data.name,
      type: +this.data.type,
      startDateTime: new Date(`${this.data.startDate} ${this.data.startTime}`),
      duration: this.data.duration,
      location: this.data.location,
      level: this.data.level,
      countLimit: +this.data.countLimit || 0,
      description: this.data.description,
      headPhotoPath: this.data.headPhotoPath
    }

    wx.request({
      url: `${app.globalData.apiUrl}activity/addOrUpdate`,
      data: obj,
      method: 'POST',
      success(result) {
        app.globalData.activityId = '';
        if (id !== '') {
          modelTitle = '修改成功';
        }

        wx.showModal({
          title: modelTitle,
          showCancel: false,
          content: "活动已成功修改",
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index'
              });
            }
          }
        })
      }
    });

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
   * 更改开始时间
   */
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  bindTypeChange: function (e) {
    this.setData({
      type: e.detail.value
    })
  },

  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputLocation(e) {
    this.setData({
      location: e.detail.value
    })
  },

  inputDuration(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  inputCountLimit(e) {
    this.setData({
      countLimit: e.detail.value
    })
  },

  inputLevel(e) {
    this.setData({
      level: e.detail.value
    })
  },

  inputDescription(e) {
    this.setData({
      description: e.detail.value
    })
  },

  onChooseImage() {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中,请稍等...',
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0; i < tempFilePaths.length; i++) {
          console.log('图片地址名称' + tempFilePaths[i]);
          wx.uploadFile({
            url: app.globalData.apiUrl + "photo/upload",
            filePath: tempFilePaths[i],
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'upload',
            success: function (result) {
              wx.hideLoading();
              let savedPhotoName = result.data;
              if (result.statusCode == 200) {
                _this.setData({
                  headPhotoPath: `${app.globalData.apiUrl}photos/${savedPhotoName}`
                });
              } else {
                wx.showToast({
                  title: '上传失败，请重新上传',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail: function (res) {
              wx.hideLoading()
              wx.showToast({
                title: '上传失败，请重新上传',
                icon: 'none',
                duration: 2000
              })
            },
          })
        }
      }
    })
  }
})