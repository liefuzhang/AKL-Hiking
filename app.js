//app.js
const CONFIG = require('config.js');

App({
  onLaunch: function (options) {
    if (options.scene == 1044) {
      console.log('场景值＝', options.shareTicket)
    }

    // 登录
    wx.checkSession({
      success: res => {
        console.log('登录状态未过期', res);
      },
      fail: res => {
        wx.login({
          success: res => {
            console.log('登录成功后：', res);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: `${this.globalData.apiUrl}?mod=api&ctr=weixin&act=login`,
              data: {
                appid: this.globalData.appid,
                secret: this.globalData.secret,
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              method: 'POST',
              success(result) {
                wx.setStorage({
                  key: "userInfo",
                  data: {
                    openid: result.data.data.openid
                  }
                });
                console.log('获取session_key的成功信息：', result)
              }
            });
          }
        })
      }
    });

    this.getUserInfo();
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
    appid: CONFIG.appid,
    secret: CONFIG.secret,
    activityId:''
  },
  // 获取用户授权
  getUserInfo: function(){
    let _this = this;
    // 获取用户信息, 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      // withCredentials: true,
      success: res => {
        console.log('用户信息:', res);

        // 可以将 res 发送给后台解码出 unionId
        _this.globalData.userInfo = res.userInfo;
        // wx.setStorage({
        //   key: "userInfo",
        //   data: res.userInfo
        // })

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