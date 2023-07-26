//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const OrderService = require('../services/OrderService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class OrderController {

	async orderlist(req, res) {
		try {
			var user = await OrderService.order_list(req.body);
			return responseHelper.success(user, 'user order fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async total_order(req, res) {
		try {
			var user = await OrderService.total_order()
			return responseHelper.success(user, 'all order fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async order_details(req, res) {
		try {
			var user = await OrderService.order_details(req.body)
			return responseHelper.success(user, 'order details fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

}
module.exports = new OrderController();