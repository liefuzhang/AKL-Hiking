var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx99159edbba6cbcd3';
var sessionKey = 'T/lPBzkchxn5CQLIIbDNqQ==';
var iv = '+12d7pUeL272zknV/gqsZw==';

var encryptedData = 'mMJb/LXMDfXCd2hgsPH8y3EEp7SATDQMXxdUWOmMQZzZM6gk+6BI8PMLt4vZIF2Bh1dnfHr0S4Qn6wvxowfkMxn+ODXnte4P7mJ5P7Pz4aP3rTI+IhR/02PxYSg/feB5MvU7hDJmtLje34701RTOrA==';
	



var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
