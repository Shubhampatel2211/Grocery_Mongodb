const { User, conn, Category, SubCategory, Brand, Product, Wishlist, Addtocart, Address, Section, Sectionslider, Sectionproduct, Sectioncategory, Sectionbrand, Coupen, Setting, Orders, Orderitem } = require('../../../data/models/index')
const mongoose = require('mongoose');
const promise = require('bluebird')
const moment = require('moment')

const {
	resolve
} = require('path');
const { response } = require('express');
const { nextTick } = require('process');
const { pipeline } = require('stream');


class UserService {

	async register(body, mobileno) {
		try {
			let { firstname, lastname, email } = body
			const emailcheck = await User.find({ email: email })
			for (let i = 0; i < emailcheck.length; i++) {
				if (emailcheck[i].email == email && emailcheck[i].mobileno == mobileno) {
					var update = await User.updateOne({ mobileno: mobileno }, { $set: { firstname: firstname, lastname: lastname, email: email } })
					if (update) {
						var uquery = await User.findOne({ mobileno: mobileno, isregisterd: 1 })
						return promise.resolve(body);
					}
				}
				else {
					var error = Error("email already exits");
					return promise.reject(error);
				}
			}

			if (!emailcheck.length > 0) {
				var update = await User.updateOne({ mobileno: mobileno }, { $set: { firstname: firstname, lastname: lastname, email: email } })
				if (update) {
					var uquery = await User.findOne({ mobileno: mobileno, isregisterd: 1 })
					return promise.resolve(body);
				} else {
					var error = Error("not updated your data");
					return promise.reject(error);
				}
			}
		} catch (error) {
			return promise.reject(error)
		}

	}

	async sendotp(body) {
		try {
			let { mobileno } = body
			const fetch = await User.findOne({ mobileno: mobileno, isregisterd: 1 })
			if (fetch) {
				var val = Math.floor(1000 + Math.random() * 9000);
				await User.updateOne({ mobileno: mobileno }, { $set: { otp: val } })
				var message = { otp: val }
				return promise.resolve(message)
			} else {
				const insert = await User.create({
					mobileno: mobileno
				})
				if (insert) {
					var val = Math.floor(1000 + Math.random() * 9000);
					await User.updateOne({ mobileno: mobileno }, { $set: { otp: val, isregisterd: 1 } })
					var message = { otp: val }
					return promise.resolve(message)
				}
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async resendotp(body) {
		try {
			let { mobileno } = body
			const fetch = await User.findOne({ mobileno: mobileno, isregisterd: 1 })
			if (fetch) {
				var val = Math.floor(1000 + Math.random() * 9000);
				await User.updateOne({ mobileno: mobileno }, { $set: { otp: val } })
				var message = { otp: val }
				return promise.resolve(message)
			}
			else {
				var err = { message: "mobile number does not exists" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}


	async login(body) {
		try {
			let { mobileno, otp } = body
			var mobilecheck = await User.findOne({ mobileno: mobileno })
			if (mobilecheck) {
				var otpcheck = await User.findOne({ mobileno: mobileno, otp: otp })
				if (!otpcheck) {
					var data = {
						status: 200,
						message: 'otp is not valid',
						detail: {}
					}
					return promise.reject(data)
				}
				else {
					return promise.resolve(otpcheck)
				}
			}
			else {
				var err = { message: "mobile number does not exists" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async categorydata() {
		try {
			const category = await Category.aggregate([
				{
					$lookup:
					{
						from: "subcategory",
						localField: "category_id",
						foreignField: "category_id",
						as: "subcategory"
					}
				}
			])
			return promise.resolve(category)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async productlist(body) {
		try {
			let { id } = body
			const subcategory = await SubCategory.find({ subcategory_id: id })
			if (subcategory.length > 0) {
				const product = await Product.find({ subcategory_id: id })
				const brand = await Brand.find({ subcategory_id: id })
				return promise.resolve({ productlist: product, brandlist: brand })
			} else {
				var err = { message: "id not found please enter valid id" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async search(body) {
		let { search, filter } = body
		return new Promise(async (resolve, reject) => {
			try {
				if ('search' in body) {
					search = `${search}`.trim();
					const product = await Product.find({ 'product_name': { '$regex': `${search}` } })
					resolve(product);
				}

				if ('filter' in body) {
					let filterCondition = await this.filterBy(filter);
					resolve(filterCondition);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	async filterBy(filter) {
		var indata = [], brandId = [], s_query, query, minmax, discountdata, sort
		query = [{
			$lookup:
			{
				from: "brands",
				localField: "brand_id",
				foreignField: "_id",
				as: "branddata"
			}
		},
		{
			$project:
			{
				branddata: 0
			}
		}
		]
		console.log("executed data ", query)
		if (filter.brand) {
			brandId = filter.brand
			if (brandId !== null) {
				for (var i = 0; i < brandId.length; i++) {
					indata = mongoose.Types.ObjectId(brandId[i])
					brandId[i] = indata
				}
				s_query = {
					$match:
						{ brand_id: { $in: brandId } }
				}
			};
			query = query.concat(s_query)
		}
		if (filter.price) {
			let maxPrice = filter.price.max;
			let minPrice = filter.price.min;
			minmax = { $match: { price: { $gt: minPrice, $lt: maxPrice } } }
			query = query.concat(minmax)
		}

		if (filter.discount) {
			let minDiscount, maxDiscount;
			switch (filter.discount) {
				case 1:
					minDiscount = 0;
					maxDiscount = 5;
					break;

				case 2:
					minDiscount = 5;
					maxDiscount = 11;
					break;

				case 3:
					minDiscount = 15;
					maxDiscount = 20;
					break;
			}
			discountdata = { $match: { discount: { $gt: minDiscount, $lt: maxDiscount } } };
			query = query.concat(discountdata)
		}
		if (filter.sortby) {
			switch (filter.sortby) {
				case 1:
					sort = { $sort: { price: 1 } }
					query = query.concat(sort)
					break;

				case 2:
					sort = { $sort: { price: -1 } }
					query = query.concat(sort)
					break;
			}
		}
		var data = await Product.aggregate([query])
		return data;
	}

	async addwishlist(body, id) {
		try {
			var { productid } = body
			var product = await Product.find({ product_id: productid })
			if (product.length > 0) {
				var check = await Wishlist.find({ user_id: id, product_id: productid })
				if (check.length > 0) {
					var del = await Wishlist.deleteMany({ user_id: id, product_id: productid })
					if (del) {
						const flag1 = await Product.updateMany({ product_id: productid }, { $set: { flag: 0 } })
						var alldel = { message: "product removed from wishlist" }
						return promise.resolve(alldel)
					}
				} else {
					var insert = await Wishlist.create({
						user_id: id,
						product_id: productid
					})
					if (insert) {
						var flag = await Product.updateMany({ product_id: productid }, { $set: { flag: 1 } })
						var allinsert = { message: "product added to wishlist successfully" }
						return promise.resolve(allinsert)
					}
				}
			}
			else {
				var err = { message: "product id not found please enter valid product id" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error);
		}
	}

	async getwishlist(id) {
		try {
			const fetch = await Wishlist.aggregate([
				{ $match: { user_id: mongoose.Types.ObjectId(id) } },
				{
					$lookup:
					{
						from: "product",
						localField: "product_id",
						foreignField: "product_id",
						as: "total_wishlist"
					}
				},
				{
					$project: {
						"_id": 0,
						total_wishlist: {
							_id: 1,
							image: 1,
							product_name: 1,
							variation: 1,
							price: 1,
							discount: 1
						}
					}
				}
			])
			let result = fetch.map(({ total_wishlist }) => total_wishlist[0])
			if (result) {
				return promise.resolve(result)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async brandlist() {
		try {
			const brand = await Brand.find({ status: 1 })
			return promise.resolve(brand)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async discount() {
		try {
			var data = {
				1: "Upto 5%",
				2: "5%-10%",
				3: "10%-15%",
				4: "15%-25%",
				5: "More then 25%"
			}
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async sortby() {
		try {
			var sortby = {
				1: "Popularity",
				2: "Price-Low to High",
				3: "Price- High to Low",
				4: "Alphabetical",
				5: "Rupee-Saving High to Low",
				6: "Rupee-Saving Low to High",
				7: "%Off-High to Low"
			}
			return promise.resolve(sortby)
		} catch (error) {
			return reject(error)
		}
	}

	async pricerange() {
		try {
			var maxmin = await Product.aggregate([
				{
					$facet: {
						min: [{ $sort: { price: 1 } }, { $limit: 1 }],
						max: [{ $sort: { price: -1 } }, { $limit: 1 }]
					}
				},
				{ $project: { minprice: { $first: "$min.price" }, maxprice: { $first: "$max.price" } } }
			])
			return promise.resolve(maxmin)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async brandsearch(body) {
		try {
			let { search } = body
			search = `${search}`.trim();
			const brand = await Brand.find({ 'name': { '$regex': `${search}` } })
			return promise.resolve(brand);
		} catch (error) {
			return promise.reject(error)
		}
	}

	async addtocart(body, id) {
		try {
			let { productid, quantity } = body
			const product = await Product.find({ product_id: productid })
			if (product.length > 0) {
				var check = await Addtocart.find({ user_id: id, product_id: productid })
				if (check.length > 0) {
					if (product[0].stock == '1') {
						await Addtocart.updateMany({ product_id: productid, user_id: id }, { $set: { quantity: quantity } })
						var alldel = { message: "product quantity added in cart" }
						return promise.reject(alldel)
					} else {
						var outofstock = { message: "sorry currently product out of stock " }
						return promise.reject(outofstock)
					}
				} else {
					if (product[0].stock == '1') {
						await Addtocart.create({
							user_id: id,
							product_id: productid,
							quantity: quantity
						})
						return promise.resolve(body)
					} else {
						var outofstock = { message: "sorry currently product out of stock" }
						return promise.reject(outofstock)
					}
				}
			}
			else {
				var err = { message: "product id not found please enter valid product id" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async addaddress(body, id) {
		try {
			let { type, housedetail, landmark, reciepant_name } = body
			var check = await Address.find({ user_id: id, type: type })
			if (!check.length > 0) {
				await Address.create({
					user_id: id,
					type: type,
					housedetail: housedetail,
					landmark: landmark,
					reciepant_name: reciepant_name
				})
				return promise.resolve(body)
			} else {
				var err = { message: "your address already been stored" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async deleteaddress(body, id) {
		try {
			let { address_id } = body
			var check = await Address.find({ user_id: id, address_id: address_id })
			if (check.length > 0) {
				var del = await Address.deleteOne({ address_id: address_id })
				return promise.resolve({})
			} else {
				var err = { message: "address id not found please enter valid address id" }
				return promise.reject(err)
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async getaddresslist(id) {
		try {
			var fetch = await Address.find({ user_id: id })
			return promise.resolve(fetch)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async homemanagement() {
		return new Promise(async (resolve, reject) => {
			try {
				var final = []
				var sum = 0
				const section = await Section.find()
				for (let i = 0; i < section.length; i++) {
					var imageslider = await Section.aggregate([
						{ $match: { section_id: section[i].section_id } },
						{
							$lookup:
							{
								from: "sectionslider",
								localField: "section_id",
								foreignField: "section_id",
								as: "imageslider"
							}
						},
						{
							$lookup:
							{
								from: "sectioncategory",
								localField: "section_id",
								foreignField: "section_id",
								as: "sectioncategory",
								pipeline: [
									{
										$lookup: {
											from: "category",
											localField: "category_id",
											foreignField: "category_id",
											as: "sectioncategorys"
										}
									},
									{
										$unwind: '$sectioncategorys',
									},
									{
										$group: {
											_id: '$_id',
											category_id: {
												$first: '$sectioncategorys.category_id',
											},
											category_name: {
												$first: '$sectioncategorys.category_name',
											},
											image: {
												$first: '$sectioncategorys.image',
											},
											icon_image: {
												$first: '$sectioncategorys.icon_image',
											},
											offer: {
												$first: '$offer',
											},
											section_id: {
												$first: '$section_id',
											},
											status: {
												$first: '$sectioncategorys.status',
											}
										}
									}
								]

							}
						},
						{
							$lookup:
							{
								from: "sectionproduct",
								localField: "section_id",
								foreignField: "section_id",
								as: "sectionproduct",
								pipeline: [{
									$unwind: {
										path: '$sectionproduct',
										preserveNullAndEmptyArrays: true,
									}
								},
								{
									$lookup: {
										from: "product",
										localField: "product_id",
										foreignField: "product_id",
										as: "sectionproducts"
									}
								},
								{
									$unwind: '$sectionproducts',
								},
								{
									$group: {
										_id: '$_id',
										product_id: {
											$first: '$sectionproducts.product_id',
										},
										product_name: {
											$first: '$sectionproducts.product_name',
										},
										variation: {
											$first: '$sectionproducts.variation',
										},
										price: {
											$first: '$sectionproducts.price',
										},
										discount: {
											$first: '$sectionproducts.discount',
										},
										finalprice: { $sum: { $subtract: ["$sectionproducts.price", { $multiply: [{ $divide: ["$sectionproducts.discount", 100] }, "$sectionproducts.price"] }] } },
										section_id: {
											$first: '$section_id',
										},
										stock: {
											$first: '$sectionproducts.stock',
										}
									}
								}]
							},

						},
						{
							$lookup:
							{
								from: "sectionbrand",
								localField: "section_id",
								foreignField: "section_id",
								as: "sectionbrand",
								pipeline: [
									{
										$lookup: {
											from: "brand",
											localField: "brand_id",
											foreignField: "brand_id",
											as: "sectionbrands"
										}
									},
									{
										$unwind: '$sectionbrands',
									},
									{
										$group: {
											_id: '$_id',
											brand_id: {
												$first: '$sectionbrands.brand_id',
											},
											name: {
												$first: '$sectionbrands.name',
											},
											image: {
												$first: '$sectionbrands.image',
											},

											section_id: {
												$first: '$section_id',
											},
											status: {
												$first: '$sectionbrands.status',
											}
										}
									}
								]
							}
						}
					])
					console.log("==", imageslider)
					var object = Object.assign({}, ...imageslider);
					final.push(object)
				}
				return resolve(final)
			} catch (error) {
				return reject(error)
			}
		})
	}

	async cartlist(id, body) {
		return new Promise(async (resolve, reject) => {
			try {
				let { quantity, product_id } = body
				if ('quantity' && 'product_id' in body) {
					var updatequantity = await Addtocart.updateMany({ user_id: id, product_id: product_id }, { $set: { quantity: quantity } })
				}
				var deleteproduct = await Addtocart.deleteOne({ quantity: 0 })
				var fetch = await Addtocart.aggregate([
					{ $match: { user_id: mongoose.Types.ObjectId(id) } },
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
							_id: '$product_id',
							quantity: {
								$first: '$quantity',
							},
							product_name: {
								$first: '$productlist.product_name',
							},
							price: {
								$first: '$productlist.price',
							},
							image: {
								$first: '$productlist.image',
							},
						}
					},
				])
				let finalcart = await this.finalcart(id, body)
				return resolve(fetch.concat(finalcart))
			} catch (error) {
				return reject(error)
			}
		})

	}

	async finalcart(id, body) {
		let { coupen_id } = body
		var final = [];
		var sum = 0
		var sum1 = 0
		// main price object //
		var mainprice = await Addtocart.aggregate([
			{ $match: { user_id: mongoose.Types.ObjectId(id) } },
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
					price: {
						$first: '$productlist.price',
					},
					discount: {
						$first: '$productlist.discount'
					},
					discount_price: {
						$first: '$productlist.discount_price'
					},
					quantity: {
						$first: '$quantity',
					},
					finalprice: { $sum: { $multiply: ["$quantity", "$productlist.price"] } },
				}
			}
		])
		for (let i = 0; i < mainprice.length; i++) {
			sum = sum + mainprice[i].finalprice
		}

		//total price object//
		for (let j = 0; j < mainprice.length; j++) {
			mainprice[j].price = mainprice[j].price * mainprice[j].quantity
			mainprice[j].discount = mainprice[j].discount * mainprice[j].quantity
			mainprice[j].discount_price = mainprice[j].discount_price * mainprice[j].quantity

			var discount = mainprice[j].price * mainprice[j].discount / 100
			if (discount < mainprice[j].discount_price) {
				var text = mainprice[j].price - discount
			} else {
				var text = mainprice[j].price - mainprice[j].discount_price
			}
			final.push(text)
		}

		for (let k = 0; k < final.length; k++) {
			sum1 = sum1 + final[k]
		}

		/*tax calculation for the total price */
		let setting = await Setting.find()
		var tax2 = setting[0].tax

		var finaltax = sum1 * tax2 / 100

		/* delivery charge object */
		var delivery = setting[0].freedeliveryupto

		if (sum1 > delivery) {
			var result = "free"
		} else {
			var result2 = setting[0].deliverycharge
		}

		/* grand total  object */
		if (result) {
			var data = sum1 + finaltax
		}
		else {
			var grandtotal2 = sum1 + finaltax + result2
		}

		/* total saving object*/
		var saving = sum - sum1

		if ('coupen_id' in body) {
			var coupen = await Coupen.find({ coupen_id: coupen_id })
			if (coupen.length > 0) {
				const d = new Date()
				var currentdate = moment(coupen[0].startdate)
				var lastdate = moment(coupen[0].enddate)
				if (currentdate.isSameOrBefore(lastdate)) {
					if (sum1 > coupen[0].minpurchase) {
						data = data - coupen[0].discountprice
						grandtotal2 = grandtotal2 - coupen[0].discountprice
						saving = saving + coupen[0].discountprice
					}
					else {
						return (`total is not greter than '${coupen[0].minpurchase}' than coupen is not used`)
					}
				}
				else {
					return ("coupen is expired")
				}
			}
		}
		let cart = {
			mainprice: sum,
			total: sum1,
			tax: finaltax,
			deliverycharge: result || result2,
			grandtotal: data || grandtotal2,
			totalsaving: saving
		}
		return cart;
	}

	async checkout(id, body) {
		try {
			let { address_id, coupen_id } = body
			var address = await Address.find({ user_id: id, address_id: address_id })
			var cod = "CASH ON DELIEVERY"
			var cart = await this.finalcart(id, body)
			const d = new Date()
			var currentdate = moment(d)
			var check = await Addtocart.find({ user_id: id })
			if (check.length > 0) {
				let insert = await Orders.create({
					user_id: id,
					address_id: address[0].address_id,
					order_date: currentdate,
					subtotal: cart.total,
					delivery_charge: cart.deliverycharge,
					grandtotal: cart.grandtotal,
					paymenttype: cod,
					status: 1,
					coupen_id: coupen_id
				})
				if (insert) {
					var index = await Orders.aggregate([
						{ $match: { user_id: mongoose.Types.ObjectId(id) } },
						{
							$lookup: {
								from: "addtocart",
								localField: "user_id",
								foreignField: "user_id",
								as: "cartlist",
								pipeline: [
									{ $match: { user_id: mongoose.Types.ObjectId(id) } },
									{
										$lookup: {
											from: "product",
											localField: "product_id",
											foreignField: "product_id",
											as: "sectionproducts"
										}
									},
									{
										$unwind: '$sectionproducts',
									},
									{
										$group: {
											_id: '$product_id',
											product_id: {
												$first: '$sectionproducts.product_id',
											},
											quantity: {
												$first: '$quantity',
											},
											price: {
												$first: '$sectionproducts.price',
											},
											discount_price: {
												$first: '$sectionproducts.discount_price',
											},
										}
									}]
							}
						},
						{
							$project: {
								"_id": 1,
								cartlist: {
									_id: 1,
									product_id: 1,
									quantity: 1,
									price: 1,
									discount_price: 1

								}
							}
						},
					])

					for (let i = 0; i < index.length; i++) {
						var dataset = index[i].cartlist
						var order_id = index[i]._id

						for (let j = 0; j < dataset.length; j++) {
							var orderitem = await Orderitem.create({
								product_id: dataset[j].product_id,
								order_id: order_id,
								price: dataset[j].price,
								discount_price: dataset[j].discount_price,
								quantity: dataset[j].quantity
							})
						}
					}
				}
			}
			var cartlist = {
				item_total: cart,
				delieverytype: cod
			}
			return promise.resolve(cartlist)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async orderlist(id) {
		try {
			var data = await Orders.aggregate([
				{ $match: { user_id: mongoose.Types.ObjectId(id) } },
				{
					$lookup: {
						from: "address",
						localField: "address_id",
						foreignField: "address_id",
						as: "addresslist",
					}
				},
				{
					$unwind: '$addresslist'
				},
				{
					$group: {
						_id: '$_id',
						order_date: {
							$first: '$order_date',
						},
						Totalpayment: {
							$first: '$grandtotal'
						},
						status: {
							$first: '$status'
						},
						Deliveredto: {
							$first: '$addresslist.type',
						},
					}
				}
			])
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async orderdetails(id, body) {
		try {
			var { order_id } = body

			var data = await Orders.aggregate([
				{ $match: { user_id: mongoose.Types.ObjectId(id), _id: mongoose.Types.ObjectId(order_id) } },
				{
					$lookup: {
						from: "address",
						localField: "address_id",
						foreignField: "address_id",
						as: "addresslist",
					}
				},
				{
					$unwind: '$addresslist'
				},
				{
					$group: {
						_id: '$_id',
						order_date: {
							$first: '$order_date',
						},
						paymenttype: {
							$first: '$paymenttype'
						},
						fulladdress: { $first: { $concat: ["$addresslist.housedetail", " ", "$addresslist.landmark"] } }
					}
				},
			])
			var items = await Orderitem.aggregate([
				{ $match: { order_id: mongoose.Types.ObjectId(order_id) } },
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
						image: {
							$first: { $concat: ['http://localhost:4000/uploads/', '$productlist.image'] },
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
						//fulladdress: {$first: {$concat:["$addresslist.housedetail"," ","$addresslist.landmark"]}}
					}
				},
				{
					$project: {
						"_id": 0,
						image: 1,
						product_name: 1,
						price: 1,
						quantity: 1
					}
				},
			])
			data[0].item = items

			var bill = await Orders.aggregate([
				{ $match: { _id: mongoose.Types.ObjectId(order_id) } },
				{
					$project: {
						"_id": 0,
						subtotal: 1,
						delivery_charge: 1,
						grandtotal: 1,
					}
				},
			])
			data[0].bill_details = bill[0]
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

}
module.exports = new UserService()
