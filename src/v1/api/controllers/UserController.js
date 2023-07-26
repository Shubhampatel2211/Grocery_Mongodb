const validator = require('../middleware/validation')
const CommonController = require('./CommonController')
const UserService = require('../services/UserService')
const responseHelper = require('../../api/resources/responsecontroller');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class UserController {

	async register(req, res) {
		try {
			await validator.registervalidation(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var mobileno = decoded.user.mobileno;
			const user = await UserService.register(req.body, mobileno);
			return responseHelper.success(user, 'register SUCCESS', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async sendotp(req, res) {
		try {
			await validator.sendOtpValidation(req.body)
			const user = await UserService.sendotp(req.body);
			return responseHelper.success(user, 'send otp SUCCESS', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async resendotp(req, res) {
		try {
			const user = await UserService.resendotp(req.body);
			return responseHelper.success(user, 'resend otp  SUCCESS', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async login(req, res) {
		try {
			await validator.loginValidation(req.body)
			const user = await UserService.login(req.body);
			if (user) {
				user.authtoken = '';
				let token = jwt.sign({ user: user }, 'practice', { expiresIn: '30d' });
				await User.updateOne({ mobileno: user.mobileno }, { $set: { authtoken: token } })
				var userdata = await User.findOne({ mobileno: user.mobileno })
				return responseHelper.success(userdata, 'user login SUCCESS', res);
			}
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async categorydata(req, res) {
		try {
			const user = await UserService.categorydata();
			return responseHelper.success(user, 'category data fetched SUCCESS', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async productlist(req, res) {
		try {
			await validator.productidValidation(req.body)
			const user = await UserService.productlist(req.body);
			return responseHelper.success(user, 'product list fetched SUCCESS', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async search(req, res) {
		try {
			var user = await UserService.search(req.body);
			return responseHelper.success(user, 'search baar', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async addwishlist(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.addwishlist(req.body, id);
			return responseHelper.success(user, 'added and removed from wishlist', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async getwishlist(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.getwishlist(id);
			return responseHelper.success(user, 'get wishlist', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async brandlist(req, res) {
		try {
			var user = await UserService.brandlist()
			return responseHelper.success(user, 'brandlist display', res)
		} catch (error) {
			return responseHelper.error(error, res)
		}
	}


	async discount(req, res) {
		try {
			var user = await UserService.discount()
			return responseHelper.success(user, 'discount display', res)
		} catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async sortby(req, res) {
		try {
			var user = await UserService.sortby()
			return responseHelper.success(user, 'sortby display', res)
		} catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async pricerange(req, res) {
		try {
			var user = await UserService.pricerange();
			return responseHelper.success(user,'price range', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async brandsearch(req, res) {
		try {
			var user = await UserService.brandsearch(req.body);
			return responseHelper.success(user, 'search brand', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async addtocart(req, res) {
		try {
			await validator.cartValidation(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.addtocart(req.body, id);
			return responseHelper.success(user, 'added to cart successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async addaddress(req, res) {
		try {
			await validator.addressvalidation(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.addaddress(req.body, id);
			return responseHelper.success(user, 'address added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async deleteaddress(req, res) {
		try {
			await validator.addressidvalidation(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.deleteaddress(req.body, id);
			return responseHelper.success(user, 'address deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async getaddresslist(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.getaddresslist(id);
			return responseHelper.success(user, 'address fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async homemanagement(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.homemanagement(id);
			return responseHelper.success(user, 'home management', res);
		} catch (error) {
			console.log(error)
			return responseHelper.error(error, res);
		}
	}

	async cartlist(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.cartlist(id, req.body);
			return responseHelper.success(user, 'cart-list displayed', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async checkout(req, res) {
		try {
			await validator.checkout(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.checkout(id, req.body);
			return responseHelper.success(user, 'check-out page displayed', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async orderlist(req, res) {
		try {
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.orderlist(id);
			return responseHelper.success(user, 'order-list fetched', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async orderdetails(req, res) {
		try {
			await validator.orderdetails(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user._id;
			var user = await UserService.orderdetails(id, req.body);
			return responseHelper.success(user, 'order-details page displayed', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

}
module.exports = new UserController();