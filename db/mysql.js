const { MYSQL_CONF } = require('../config/db')
const mysql = require('mysql')

// 创建链接对象
const connect = mysql.createConnection(MYSQL_CONF)

// 开始链接
connect.connect()

function exec(sql) {
	return new Promise((resolve, reject) => {
		connect.query(sql, (err, result) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			}
			resolve(result)
		})
	})
}

module.exports = {
	exec,
	escape: mysql.escape
}

