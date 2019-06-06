const {exec, escape} = require('../db/mysql')
const { genPassword } = require('../utils/crypto')
function checkUser(username) {
	const sql = `select username from users where username=${username};`
	return exec(sql).then(rows => {
		return rows[0] || ''
	})
}

// 注册
const register = (username, password, realname) => {
	username = escape(username)
	password = genPassword(password)
	password = escape(password)
	realname = escape(realname)
	return checkUser(username).then(res => {
		if (!res) {
			const sql = `insert into users (username, password, realname) values (${username}, ${password}, ${realname});`
			return exec(sql).then(res => {
				return {
					id: res.insertId
				}
			})
		} else {
			return Promise.resolve({id: ''})
		}
	})
}

// 登录
const login = (username, password) => {
	username = escape(username)
	password = genPassword(password)
	password = escape(password)
	console.log(username)
	const sql = `select username, realname from users where username=${username} and password=${password};`
	return exec(sql).then(rows => {
		return rows[0] || {}
	})
}

module.exports = { login, register }
