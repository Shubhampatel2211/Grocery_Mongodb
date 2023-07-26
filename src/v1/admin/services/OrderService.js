const { User, conn, Orders, Orderitem } = require('../../../data/models/index')
const promise = require('bluebird')
const mongoose = require('mongoose')

class OrderService {

	async order_list(body) {
		try {
			const { user_id } = body
			const user = await Orders.find({ user_id })
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async total_order() {
		try {
			const user = await Orders.find()
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async order_details(body) {
		try {
			const { order_id } = body
			var user = await Orders.aggregate([
				{ $match: { _id: mongoose.Types.ObjectId(order_id) } },
				{
					$lookup: {
						from: "orderitem",
						localField: "_id",
						foreignField: "order_id",
						as: "orderlist",
						pipeline: [
							{
								$lookup: {
									from: "product",
									localField: "product_id",
									foreignField: "product_id",
									as: "productlist",
								}
							},
							{
								$unwind: '$productlist'
							},
							{
								$group: {
									_id: '$_id',
									variation: {
										$first: '$productlist.variation',
									},
									product_name: {
										$first: '$productlist.product_name',
									},
									price: {
										$first: '$productlist.price'
									},
									quantity: {
										$first: '$quantity',
									},
									total: {
										$first: { $multiply: ['$quantity', '$productlist.price'] }
									},

								}
							},
						]

					}
				},
				{
					$group: {
						_id: '$_id',

						grandtotal: {
							$first: '$grandtotal',
						},
						subtotal: {
							$first: '$subtotal',
						},
						deliverycharge: {
							$first: '$delivery_charge',
						},
						paymenttype: {
							$first: '$paymenttype',
						},
						orderlist: {
							$first: '$orderlist',
						},
					}
				},

			])

			var userdetail = await Orders.aggregate([
				{ $match: { _id: mongoose.Types.ObjectId(order_id) } },
				{
					$lookup: {
						from: "address",
						localField: "address_id",
						foreignField: "address_id",
						as: "addresslist",
					}
				},
				{
					$lookup: {
						from: "users",
						localField: "user_id",
						foreignField: "_id",
						as: "userlist",
					}
				},
				{
					$unwind: '$addresslist',
				},
				{
					$unwind: '$userlist',
				},
				{
					$group: {
						_id: '$_id',
						name: {
							$first: { $concat: ['$userlist.firstname', " ", '$userlist.lastname'] },
						},
						address: { $first: { $concat: ["$addresslist.housedetail", " ", "$addresslist.landmark"] } },
						mobileno: {
							$first: '$userlist.mobileno',
						},
						email: {
							$first: '$userlist.email',
						},
					}
				},
			])
			user[0].userinfo = userdetail[0]
			return promise.resolve(user)
		} catch (error) {
			return promise.reject(error)
		}
	}



}
module.exports = new OrderService();