//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const HomeManagementService = require('../services/HomeManagementService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken, SubCategory } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class HomeManagementController {

	async add_sectionslider(req, res) {
		try {
			await validator.add_sectionslidervalidation(req.body)
			var user = await HomeManagementService.add_sectionslider(req, req.body);
			return responseHelper.success(user, 'sectionslider added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async delete_sectionslider(req, res) {
		try {
			var user = await HomeManagementService.delete_sectionslider(req.body);
			return responseHelper.success(user, 'sectionslider deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async sectionslider_list(req, res) {
		try {
			var user = await HomeManagementService.sectionslider_list();
			return responseHelper.success(user, 'sectionslider fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async add_sectioncategory(req, res) {
		try {
			await validator.add_sectioncategoryvalidation(req.body)
			var user = await HomeManagementService.add_sectioncategory(req.body);
			return responseHelper.success(user, 'sectioncategory added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async delete_sectioncategory(req, res) {
		try {
			var user = await HomeManagementService.delete_sectioncategory(req.body);
			return responseHelper.success(user, 'sectioncategory deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}
	async sectioncategory_list(req, res) {
		try {
			var user = await HomeManagementService.sectioncategory_list();
			return responseHelper.success(user, 'sectioncategory fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async add_sectionproduct(req, res) {
		try {
			await validator.add_sectionproductvalidation(req.body)
			var user = await HomeManagementService.add_sectionproduct(req.body);
			return responseHelper.success(user, 'sectionproduct added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async delete_sectionproduct(req, res) {
		try {
			var user = await HomeManagementService.delete_sectionproduct(req.body);
			return responseHelper.success(user, 'sectionproduct deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async sectionproduct_list(req, res) {
		try {
			var user = await HomeManagementService.sectionproduct_list();
			return responseHelper.success(user, 'sectionproduct fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async add_sectionbrand(req, res) {
		try {
			await validator.add_sectionbrandvalidation(req.body)
			var user = await HomeManagementService.add_sectionbrand(req.body);
			return responseHelper.success(user, 'sectionbrand added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async delete_sectionbrand(req, res) {
		try {
			var user = await HomeManagementService.delete_sectionbrand(req.body);
			return responseHelper.success(user, 'sectionbrand deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async sectionbrand_list(req, res) {
		try {
			var user = await HomeManagementService.sectionbrand_list();
			return responseHelper.success(user, 'sectionbrand fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}
}
module.exports = new HomeManagementController();