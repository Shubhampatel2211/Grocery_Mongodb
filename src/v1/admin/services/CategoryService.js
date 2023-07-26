const { User, conn, Category } = require('../../../data/models/index')
const promise = require('bluebird')
const mongoose = require('mongoose')

class CategoryService {

	async addcategory(req, body) {
		try {
			const { image, icon_image, categoryname } = body
			const user = await Category.create({
				image: req.file.filename,
				icon_image: req.file.filename,
				category_name: categoryname
			})
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deletecategory(body) {
		try {
			let { category_id } = body
			const data = await Category.deleteMany(
				{ _id: category_id }
			)
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async updatecategory(body) {
		try {
			let { category_id, status } = body
			var data = await Category.updateMany({ _id: category_id }, { $set: { status: status } })
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async categorylist() {
		try {
			let data = await Category.find()
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}
}
module.exports = new CategoryService();