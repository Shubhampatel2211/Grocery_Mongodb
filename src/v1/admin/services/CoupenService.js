const { User, conn, UserDeviceToken, Coupen } = require('../../../data/models/index')
const promise = require('bluebird')

class CoupenService {

	async addcoupen(body) {
		try {
			const { coupenname, coupencode, discountprice, minpurchase, startdate, enddate } = body
			let data = await Coupen.create({
				coupenname: coupenname,
				coupencode: coupencode,
				minpurchase: minpurchase,
				discountprice: discountprice,
				startdate: startdate,
				enddate: enddate
			})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deletecoupen(body) {
		try {
			let { coupen_id } = body
			const data = await Coupen.deleteMany(
				{ _id: coupen_id }
			)
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async updatecoupen(body) {
		try {
			let { coupen_id, status, coupenname, coupencode, minpurchase, discountprice, startdate, enddate } = body
			var data = await Coupen.updateMany({ _id: coupen_id },
				{
					$set:
					{
						status: status,
						coupenname: coupenname,
						coupencode: coupencode,
						minpurchase: minpurchase,
						discountprice: discountprice,
						startdate: startdate,
						enddate: enddate
					}
				})
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async coupenlist() {
		try {
			let data = await Coupen.find()
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}
}

module.exports = new CoupenService()