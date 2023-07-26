const { User, conn, UserDeviceToken, SubCategory } = require('../../../data/models/index')
const promise = require('bluebird')

class SubCategoryService {

	async addsubcategory(req, body) {
		try {
			const { name, image, category_id } = body
			let data = await SubCategory.create({
				name: name,
				image: req.file.filename,
				category_id: category_id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deletesubcateory(body) {
		try {
			let { subcategory_id } = body
			const data = await SubCategory.deleteMany(
				{ _id: subcategory_id }
			)
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async updatesubcategory(body) {
		try {
			let { subcategory_id, status } = body
			const data = await SubCategory.updateMany({ _id: subcategory_id }, { $set: { status: status } })
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async subcategorylist() {
		try {
			let data = await SubCategory.find()
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

}

module.exports = new SubCategoryService()