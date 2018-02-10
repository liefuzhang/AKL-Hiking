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
                console.log('获取session_key的成功信息：', result)
              }
            });
          }
        })
      }
    });

    // 获取用户信息, 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        console.log('用户信息:', res);
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
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
    appid: CONFIG.appid,
    secret: CONFIG.secret,
  }
})