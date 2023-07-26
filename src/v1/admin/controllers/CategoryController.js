//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const CategoryService = require('../services/CategoryService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class CategoryController {

	async addcategory(req, res) {
		try {
			await validator.addcategoryvalidation(req.body)
			var user = await CategoryService.addcategory(req, req.body);
			return responseHelper.success(user, 'category added successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async deletecategory(req, res) {
		try {
			var user = await CategoryService.deletecategory(req.body);
			return responseHelper.success(user, 'category deleted successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async updatecategory(req, res) {
		try {
			var user = await CategoryService.updatecategory(req.body);
			return responseHelper.success(user, 'category updated successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async categorylist(req, res) {
		try {
			var user = await CategoryService.categorylist();
			return responseHelper.success(user, 'category fetched successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

}
module.exports = new CategoryController();