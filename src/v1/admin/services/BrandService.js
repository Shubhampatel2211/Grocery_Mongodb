const { User, conn, Category, Brand } = require('../../../data/models/index')
const promise = require('bluebird')
const mongoose = require('mongoose')

class BrandService {

	async addbrand(req, body) {
		try {
			const { name } = body
			const user = await Brand.create({
				image: req.file.filename,
				name: name
			})
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deletebrand(body) {
		try {
			let { brand_id } = body
			const data = await Brand.deleteMany(
				{ _id: brand_id }
			)
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async updatebrand(body) {
		try {
			let { brand_id, status } = body
			var data = await Brand.updateMany({ _id: brand_id }, { $set: { status: status } })
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async brandlist() {
		try {
			let data = await Brand.find()
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

}
module.exports = new BrandService();