var express = require('express')
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
var router = express.Router()

/* blog */
// 列表
router.get('/list', function(req, res, next) {
	let author = req.query.author || ''
	const keyword = req.query.keyword || ''
	if (req.query.isadmin) {
		if (req.session.username == null) {
			res.json(new ErrorModel('未登录'))
			return
		}
		author = req.session.username
	}
	const result = getList(author, keyword)
	return result.then(listData => {
		res.json(new SuccessModel(listData))
	}).catch(err => {
		res.json(new ErrorModel(err))
	})
});

// 详情
router.get('/detail', function(req, res, next) {
	const id = req.query.id
	if (!id) {
		res.json(new ErrorModel('id为空'))
	}
	const result = getDetail(id)
	return result.then(detailData => {
		res.json(new SuccessModel(detailData))
	}).catch(err => {
		res.json(new ErrorModel(err))
	})
});

// 新建
router.post('/new', loginCheck, (req, res, next) => {
	req.body.author = req.session.username
	const result = newBlog(req.body)
	return result.then(blogData => {
		res.json(new SuccessModel(blogData))
	})
})

// 更新
router.post('/update', loginCheck, (req, res, next) => {
	const id = req.query.id
	const result = updateBlog(id, req.body)
	return result.then(val => {
		if (val) {
			res.json(new SuccessModel())
		}
		res.json(new ErrorModel('更新失败'))
	})
})

// 删除
router.post('/delete', loginCheck, (req, res, next) => {
	const id = req.query.id
	const author = req.session.username
	const result = deleteBlog(id, author)
	return result.then(val => {
		if (val) {
			res.json(new SuccessModel())
		}
		res.json(new ErrorModel('删除失败'))
	})
})
module.exports = router;
