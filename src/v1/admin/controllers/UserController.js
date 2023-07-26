//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const UserService = require('../services/UserService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class UserController {
	async user_list(req, res) {
		try {
			var user = await UserService.user_list();
			return responseHelper.success(user, 'user fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async user_detail(req, res) {
		try {
			var user = await UserService.user_detail(req.body);
			return responseHelper.success(user, 'user detail fetched successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

}
module.exports = new UserController();