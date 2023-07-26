//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const BrandService = require('../services/BrandService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken, Brand } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class BrandController {

	async addbrand(req, res) {
		try {
			await validator.addbrandvalidation(req.body)
			var user = await BrandService.addbrand(req, req.body);
			return responseHelper.success(user, 'brand added successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async deletebrand(req, res) {
		try {
			var user = await BrandService.deletebrand(req.body);
			return responseHelper.success(user, 'brand deleted successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async updatebrand(req, res) {
		try {
			var user = await BrandService.updatebrand(req.body);
			return responseHelper.success(user, 'brand updated successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async brandlist(req, res) {
		try {
			var user = await BrandService.brandlist();
			return responseHelper.success(user, 'brand fetched successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}


}
module.exports = new BrandController();