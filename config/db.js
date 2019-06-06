const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
if (env === 'development') {
	MYSQL_CONF = {
		host: 'localhost',
		port: '3306',
		password: 'zhangjian640',
		user: 'root',
		database: 'myblog'
	}
	REDIS_CONF = {
		host: '127.0.0.1',
		port: 6379
	}
} else if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		port: '3306',
		password: 'zhangjian640',
		user: 'root',
		database: 'myblog'
	}
	REDIS_CONF = {
		host: '127.0.0.1',
		port: 6379
	}
}
module.exports = {
	MYSQL_CONF,
	REDIS_CONF
}
