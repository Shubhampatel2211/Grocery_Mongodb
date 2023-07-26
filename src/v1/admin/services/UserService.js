const { User, conn, Order, Address } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')
const promise = require('bluebird')
const mongoose = require('mongoose');

class UserService {

	async user_list() {
		try {
			const data = await User.aggregate([
				{
					$group: {
						_id: '$_id',
						name: {
							$first: { $concat: ['$firstname', " ", '$lastname'] },
						},
						mobileno: {
							$first: '$mobileno'
						},
						email: {
							$first: '$email'
						},
						status: {
							$first: '$status'
						},
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async user_detail(body) {
		try {
			let { _id } = body
			const data = await User.aggregate([
				{ $match: { _id: mongoose.Types.ObjectId(_id) } },
				{
					$lookup: {
						from: "orders",
						localField: "_id",
						foreignField: "user_id",
						as: "orderlist",
					}
				},
				{
					$project: {
						"_id": 0,
						status: 1,
						firstname: 1,
						lastname: 1,
						email: 1,
						mobileno: 1,
						orderlist: {
							_id: 1,
							paymenttype: 1,
							status: 1,
							order_date: 1,
							grandtotal: 1
						},
					}
				},
			]
			)
			var address = await Address.aggregate([
				{ $match: { type: 1 } },
				{
					$group: {
						"_id": '$_id',
						address: { $first: { $concat: ["$housedetail", " ", "$landmark"] } },
					}
				}
			])
			data[0].addresslist = address[0]
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}
}
module.exports = new UserService();