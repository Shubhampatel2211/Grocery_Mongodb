//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const SubCategoryService = require('../services/SubCategoryService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken, SubCategory } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class SubCategoryController {

	async addsubcategory(req, res) {
		try {
			await validator.addsubcategoryvalidation(req.body)
			var user = await SubCategoryService.addsubcategory(req, req.body);
			return responseHelper.success(user, 'subcategory added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async deletesubcategory(req, res) {
		try {
			var user = await SubCategoryService.deletesubcateory(req, req.body);
			return responseHelper.success(user, 'subcategory deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async updatesubcategory(req, res) {
		try {
			var user = await SubCategoryService.updatesubcategory(req.body);
			return responseHelper.success(user, 'subcategory updated successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async subcategorylist(req, res) {
		try {
			var user = await SubCategoryService.subcategorylist();
			return responseHelper.success(user, 'subcategory fetched successfully', res);
		}catch (error) {
			return responseHelper.error(error, res);
		}
	}

}
module.exports = new SubCategoryController();