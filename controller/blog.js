const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
	author = escape(author)
	let sql = `select * from blogs where 1=1 `
	if (!author === '') {
		sql += `and author=${author} `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createtime desc;`
	return exec(sql)
}

const getDetail = (id) => {
	const sql = `select * from blogs where id=${id};`
	return exec(sql).then(row => {
		return row[0]
	})
}

const newBlog = (blogData = {}) => {
	let {title, content, author} = blogData
	title = xss(escape(title))
	content = xss(escape(content))
	author = xss(escape(author))
	const createtime = Date.now()
	const sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, '${createtime}', ${author});`
	return exec(sql).then(res => {
		return {
			id: res.insertId
		}
	})
}

const updateBlog = (id, blogData = {}) => {
	let {title, content} = blogData
	title = xss(escape(title))
	content = xss(escape(content))
	const sql = `update blogs set title=${title}, content=${content} where id='${id}';`
	return exec(sql).then(updateData => {
		return updateData.affectedRows > 0
	})
}

const deleteBlog = (id, author) => {
	author = escape(author)
	const sql = `delete from blogs where id='${id}' and author=${author};`
	return exec(sql).then(deleteData => {
		return deleteData.affectedRows > 0
	})
}

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }
