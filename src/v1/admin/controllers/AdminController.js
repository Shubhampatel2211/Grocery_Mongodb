//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const AdminService = require('../services/AdminService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken, Brand, AdminData } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class AdminController {

	async admin_login(req, res) {
		try {
			await validator.admin_loginvalidation(req.body)
			var user = await AdminService.admin_login(req.body);
			var email = user[0].email
			if (user) {
				user[0].authtoken = '';
				let token = jwt.sign({ user: user }, 'practice', { expiresIn: '30d' });
				await AdminData.updateOne({ email: email }, { $set: { authtoken: token } })
				var userdata = await AdminData.findOne({ email: email })
				return responseHelper.success(userdata, 'admin login successfully', res);
			}
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async changepassword(req, res) {
		try {
			await validator.changepasswordvalidation(req.body)
			let token = req.headers.authorization;
			var decoded = jwt.verify(token, 'practice')
			var id = decoded.user[0]._id;
			var user = await AdminService.changepassword(id, req.body);
			return responseHelper.success(user, 'password changed successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async updatesetting(req, res) {
		try {
			var user = await AdminService.updatesetting(req.body);
			return responseHelper.success(user, 'setting updated successfully', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

	async forgetpassword(req, res) {
		try {
			var user = await AdminService.forgetpassword(req.body);
			return responseHelper.success(user, 'forget password api called', res);
		}
		catch (error) {
			return responseHelper.error(error, res)
		}
	}

}
module.exports = new AdminController();