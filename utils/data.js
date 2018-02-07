let Mock = require('mock.js');
var Random = Mock.Random;

module.exports = {
  activityDetail: {
    'error_code': '',
    'error_msg': '',
    'data': {
      'startDate': Random.date(),
      'startTime': Random.time('HH:mm'),
      'endDate': Random.date(),
      'endTime': Random.time('HH:mm'),
      'closeDate': Random.date(),
      'closeTime': Random.time('HH:mm'),
      'address': Random.county(true),
      'people|1-100': 1,
      'tel': /^1[385][1-9]\d{8}/,
      'remark': '@ctitle(10,100)',
      'peoples|2-12':[
        {
          'pic': "@image('50x50', '#4A7BF7','#fff','pic')",
          'name':"@ctitle(2,8)"
        }
      ]
    }
  }
}