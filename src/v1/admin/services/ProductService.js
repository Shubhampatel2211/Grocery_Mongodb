const { User, conn, Product } = require('../../../data/models/index')
const promise = require('bluebird')
const mongoose = require('mongoose')

class ProductService {

	async addproduct(req, body) {
		try {
			const { product_name, description, short_description, variation, price, discount, discount_price, brand_id, category_id, subcategory_id } = body
			const user = await Product.create({
				image: req.file.filename,
				product_name: product_name,
				description: description,
				short_description: short_description,
				variation: variation,
				price: price,
				discount: discount,
				discount_price: discount_price,
				category_id: category_id,
				subcategory_id: subcategory_id,
				brand_id: brand_id
			})
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deleteproduct(body) {
		try {
			let { category_id } = body
			const data = await Product.deleteMany(
				{ _id: category_id }
			)
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}


	async updateproduct(body) {
		try {
			let { category_id, status } = body
			var data = await Product.updateMany({ _id: category_id }, { $set: { status: status } })
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async productlist() {
		try {
			let data = await Product.find()
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

}
module.exports = new ProductService();