const { User, Section, Sectionslider, Sectioncategory, Sectionproduct, Sectionbrand } = require('../../../data/models/index')
const promise = require('bluebird')

class HomeManagementService {

	async add_sectionslider(req, body) {
		try {
			const { category_id, section_id } = body
			let data = await Sectionslider.create({
				image: req.file.filename,
				category_id: category_id,
				section_id: section_id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async delete_sectionslider(body) {
		try {
			const { _id } = body
			let data = await Sectionslider.deleteMany({
				_id: _id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async sectionslider_list() {
		try {
			let data = await Sectionslider.aggregate([
				{
					$group: {
						_id: '$_id',
						category_id: { $first: '$category_id' },
						image: {
							$first: { $concat: ['http://localhost:4000/uploads/', '$image'] },
						}
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async add_sectioncategory(body) {
		try {
			const { category_id, offer, section_id } = body
			let data = await Sectioncategory.create({
				category_id: category_id,
				section_id: section_id,
				offer: offer
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async delete_sectioncategory(body) {
		try {
			const { _id } = body
			let data = await Sectioncategory.deleteMany({
				_id: _id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async sectioncategory_list() {
		try {
			let data = await Sectioncategory.aggregate([
				{
					$lookup: {
						from: "category",
						localField: "category_id",
						foreignField: "category_id",
						as: "categorylist",
					}
				},
				{
					$unwind: '$categorylist',
				},
				{
					$group: {
						_id: '$_id',
						category_id: { $first: '$category_id' },
						categoryname: { $first: '$categorylist.category_name' },
						categoryimage: {
							$first: { $concat: ['http://localhost:4000/uploads/', '$categorylist.image'] },
						}
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async add_sectionproduct(body) {
		try {
			const { product_id, section_id } = body
			let data = await Sectionproduct.create({
				product_id: product_id,
				section_id: section_id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async delete_sectionproduct(body) {
		try {
			const { _id } = body
			let data = await Sectionproduct.deleteMany({
				_id: _id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async sectionproduct_list() {
		try {
			let data = await Sectionproduct.aggregate([
				{
					$lookup: {
						from: "product",
						localField: "product_id",
						foreignField: "product_id",
						as: "productlist",
					}
				},
				{
					$unwind: '$productlist',
				},
				{
					$group: {
						_id: '$_id',
						product_id: { $first: '$product_id' },
						productname: { $first: '$productlist.product_name' },
						productimage: {
							$first: { $concat: ['http://localhost:4000/uploads/', '$productlist.image'] },
						}
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async add_sectionbrand(body) {
		try {
			const { brand_id, section_id } = body
			let data = await Sectionbrand.create({
				brand_id: brand_id,
				section_id: section_id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async delete_sectionbrand(body) {
		try {
			const { _id } = body
			let data = await Sectionbrand.deleteMany({
				_id: _id
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async sectionbrand_list() {
		try {
			let data = await Sectionbrand.aggregate([
				{
					$lookup: {
						from: "brand",
						localField: "brand_id",
						foreignField: "brand_id",
						as: "brandlist",
					}
				},
				{
					$unwind: '$brandlist',
				},
				{
					$group: {
						_id: '$_id',
						brand_id: { $first: '$brand_id' },
						brandname: { $first: '$brandlist.name' },
						brandimage: {
							$first: { $concat: ['http://localhost:4000/uploads/', '$brandlist.image'] },
						}
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}
}

module.exports = new HomeManagementService()