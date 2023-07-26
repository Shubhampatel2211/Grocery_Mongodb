//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const CoupenService = require('../services/CoupenService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class CoupenController {
	async addcoupen(req, res) {
		try {
			await validator.addcoupenvalidation(req.body)
			var user = await CoupenService.addcoupen(req.body)
			return responseHelper.success(user, 'coupen added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async deletecoupen(req, res) {
		try {
			var user = await CoupenService.deletecoupen(req.body);
			return responseHelper.success(user, 'coupen deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async updatecoupen(req, res) {
		try {
			var user = await CoupenService.updatecoupen(req.body);
			return responseHelper.success(user, 'coupen updated successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async coupenlist(req, res) {
		try {
			var user = await CoupenService.coupenlist(req.body)
			return responseHelper.success(user, 'coupen list fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

}
module.exports = new CoupenController();