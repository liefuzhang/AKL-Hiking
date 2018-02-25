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
    remark: '',
    userList: [],
    userid: '',
    myUserid: '',
    openGId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {
    console.log('详情');
    let id = options.id || '';
    let _this = this;

    wx.showShareMenu({
      withShareTicket: true
    });

    

    this.setData({
      myUserid: wx.getStorageSync('userInfo').userid
    });

    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityInfo&id=${id}`,
      method: 'GET',
      success(result) {
        _this.setData(result.data);
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
              let sessionKey = wx.getStorageSync('userInfo').sessionKey;

              wx.request({
                url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=jiemi`,
                method: 'POST',
                data:{
                  sessionKey: sessionKey,
                  iv: result.iv,
                  encryptedData: result.encryptedData,
                },
                success(result) {
                  console.log('解密的结果：',result.data.data.openGId);
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

  getDeatilInfo: function(){

  },

  // 我要报名
  onEnroll: function (id) {
    let userid = wx.getStorageSync('userInfo').userid;
    let _this = this;

    wx.request({
      url: `${app.globalData.apiUrl}?mod=api&ctr=weixin&act=activityEnroll&activityId=${_this.data._id}&userid=${userid}`,
      method: 'GET',
      success(result) {
        if (result.code) {

        }

        wx.showModal({
          title: '报名成功！',
          showCancel: false,
          content: "报名成功了，分享到群里让更多小伙伴来参与吧！",
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

  //预览用户
  viewUser: function () {
    wx.showModal({
      title: '',
      content: '浪子神剑（男）',
    })
  },

  // 创建活动
  createActivity: function () {
    wx.switchTab({
      url: '/pages/activity/index'
    });
  }
})