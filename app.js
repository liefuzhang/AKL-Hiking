//app.js
const CONFIG = require('config.js');

App({
  onLaunch: function (options) {
    if (options.scene == 1044) {
      console.log('分享的值＝', options.shareTicket)
    }

    let _this = this;

    // 登录
    wx.login({
      success: res => {
        console.log('获取logo的code值：', res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${_this.globalData.apiUrl}account/authorize`,
          dataType: 'json',
          data: {
            code: res.code
          },
          method: 'POST',
          success(result) {
            console.log(result)
            _this.globalData.openid = result.data.openid;
            _this.globalData.isAdmin = result.data.isAdmin;

            wx.setStorage({
              key: "userInfo",
              data: {
                openid: result.data.openid,
                userid: result.data.userid,
                avatarUrl: result.data.avatarUrl,
                sessionKey: result.data.session_key
              }
            });
            console.log('获取session_key的成功7信息：', result);

            _this.getUserInfo(options.scene);
          }
        });
      }
    })
  },

  ohShow: function (options) {
    console.log('show...', options)
  },
  onHide: function () {
    console.log('hide...', )
  },
  globalData: {
    userInfo: null,
    apiUrl: CONFIG.apiUrl,
    activityId: '',
    openid: '',
    userid: '',
    avatarUrl: '',
    sessionKey:'',
    membershipId: '',
    hikerId: null,
    isAdmin: false
  },
  // 获取用户授权
  getUserInfo: function (scene = ''){
    let _this = this;
    // 获取用户信息, 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      // withCredentials: true,
      success: res => {
        res.userInfo.scene = scene;
        console.log('用户信息:', res);

        // 可以将 res 发送给后台解码出 unionId
        _this.globalData.userInfo = res.userInfo;

        console.log('openid=', _this.globalData.openid);
        
        wx.request({
          url: `${_this.globalData.apiUrl}account/login?openid=${_this.globalData.openid}`,
          data: res.userInfo,
          method: 'POST',
          success(result) {
            console.log('用户信息储存成功：', result)
            _this.globalData.membershipId = result.data.membershipId;
            _this.globalData.hikerId = result.data.id;
          }
        });

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (_this.userInfoReadyCallback) {
          _this.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        /*
        wx.showModal({
          title: '温馨提示',
          confirmText: '确定',
          showCancel: false,
          content: "您点击了拒绝授权，将无法正常使用活动报名的功能。您可以回到首页点击获取头像授权，或者删除小程序重新进入。",
          success: function (res) {
            if (res.confirm) {

            }
          }
        })*/
      }
    })
  }
})