const crypto = require('crypto')

const SECRET_KEY = 'XX'

// MD5 加密
function md5(content) {
	const md5 = crypto.createHash('md5')
	return md5.update(content).digest('hex')
}

// 加密
function genPassword(password) {
	const str = `password=${password}&key=${SECRET_KEY}`
	return md5(str)
}

module.exports = {
	genPassword
}
