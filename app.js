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

            if (_this.globalData.userRegistered) {
              _this.login();
            }
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
    sessionKey: '',
    membershipId: '',
    hikerId: null,
    isAdmin: false,
    userRegistered: false
  },

  login: function () {
    var _this = this;
    wx.request({
      url: `${_this.globalData.apiUrl}account/login?openid=${_this.globalData.openid}`,
      method: 'POST',
      success(result) {
        _this.globalData.membershipId = result.data.membershipId;
        _this.globalData.hikerId = result.data.id;
        _this.globalData.avatarUrl = result.data.avatarUrl;
        _this.globalData.isAdmin = result.data.isAdmin;
      }
    })
  }
})