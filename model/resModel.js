class BaseModel {
	constructor(data, message) {
		if (typeof data === 'string'){
			this.message = data
			data = null
			message = null
		}
		if (data) {
			this.data = data
		}
		if (message) {
			this.message = message
		}
	}
}

class SuccessModel extends BaseModel{
	constructor(props) {
		super(props)
		this.code = 0
	}
}

class ErrorModel extends BaseModel{
	constructor(props) {
		super(props)
		this.code = -1
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}
