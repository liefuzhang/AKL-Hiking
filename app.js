//app.js
const CONFIG = require('config.js');

App({
  onLaunch: function (options) {    
    var _this = this;
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
            _this.globalData.userRegistered = result.data.userRegistered;
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
    isAdmin: false,
    userRegistered: false
  }
})