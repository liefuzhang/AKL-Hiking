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
    endTime: '',
    location: '',
    description: '',
    hikerList: [],
    waitingList: [],
    openGId: '',
    alreadyEnrolled: false,
    loaded: false,
    canIUseGetUserProfile: false,
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {
    console.log('详情' + this.data.loaded);
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

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
    this.getEnrollData(this.data._id);
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('来自按钮的分享');
    }

    let _this = this;

    console.log('分享结果：', res);

    return {
      // 我报名今晚的羽毛球活动，就差你了！
      title: `浪子神剑 邀请你来打羽毛球！`,
      path: '/pages/activity/detail?id=' + this.data._id,
      // imageUrl: '/assets/baoming.jpg',
      success: function (res) {
        // 转发成功
        console.log('成功', res);
        // 获取分享到的信息
        if (res.shareTickets) {
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: function (result) {
              console.log(result);
              let sessionKey = '';

              wx.request({
                url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=jiemi`,
                method: 'POST',
                data: {
                  sessionKey: sessionKey,
                  iv: result.iv,
                  encryptedData: result.encryptedData,
                },
                success(result) {
                  console.log('解密的结果：', result.data.data.openGId);
                  _this.setData({
                    openGId: result.data.data.openGId
                  });
                }
              });
            }
          })
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('失败');
      }
    }
  },

  getDeatilInfo: function () {

  },

  // 我要报名
  onEnroll: function () {
    if (app.globalData.userRegistered) {
      this.login(this.enrollForActivity);
    } else {
      this.getUserProfile(this.enrollForActivity)
    }    
  },

  enrollForActivity: function() {
    var _this = this;
    wx.request({
      url: `${app.globalData.apiUrl}activity/enroll`,
      data: {
        hikerId: app.globalData.hikerId,
        activityId: _this.data.activity.id
      },
      method: 'POST',
      success(result) {
        console.log("报名成功！")
        wx.showModal({
          title: '报名成功！',
          showCancel: false,
          content: "报名成功了，分享到群里让更多小伙伴来参与吧！",
          success: function (res) {
            if (res.confirm) {
              _this.getEnrollData(_this.data.activity.id);
            }
          }
        })
      }
    });
  },

  onCancelEnrollment: function (){
    let _this = this;
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
  },

  getEnrollData(id) {
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}activity/get/${id}`,
      method: 'GET',
      success(res) {
        console.log("Hiker:" + res.data.hikers[0].id)
        let activity = res.data;
        _this.setData({
          activity: activity,
          hikerList: activity.hikers.slice(0, activity.countLimit),
          waitingList: activity.hikers.slice(activity.countLimit),
          alreadyEnrolled: activity.hikers && activity.hikers.some(h => h.id === app.globalData.hikerId),
          loaded: true
        });
      }
    });
  },

  // 修改活动
  onManageActivity: function () {
    let _this = this;

    wx.showActionSheet({
      itemList: ['修改活动', '取消活动', '复制活动', '删除活动'],
      // itemColor: 'red',
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            _this.onEditActivity();
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          default:
            break;
        }
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 修改活动
  onEditActivity: function () {
    app.globalData.activityId = this.data._id;

    wx.switchTab({
      url: '/pages/activity/index'
    });
  },

  // 取消活动
  onCancelActivity: function () {
    console.log('取消成功！')
  },

  onNavigateToHome:function(){
    wx.navigateBack({ changed: true });
  },

  // 创建活动
  createActivity: function () {
    wx.switchTab({
      url: '/pages/activity/index'
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
  register: function(userInfo, callback){
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

        _this.setData({
          hasUserInfo: true
        })

        callback();
      }
  })},

  login: function(callback){
    var _this = this;
    wx.request({
      url: `${app.globalData.apiUrl}account/login?openid=${app.globalData.openid}`,
      method: 'POST',
      success(result) {
        console.log('用户login成功：', result)
        app.globalData.membershipId = result.data.membershipId;
        app.globalData.hikerId = result.data.id;
        app.globalData.avatarUrl = result.data.avatarUrl;

        _this.setData({
          hasUserInfo: true
        });

        callback();
      }
  })}
})