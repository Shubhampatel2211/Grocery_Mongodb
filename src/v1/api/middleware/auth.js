const jwt = require('jsonwebtoken');
const ResponseController = require('../resources/responsecontroller')
class Auth {
	async authenticate(req, res, next) {
		try {
			if ('authorization' in req.headers && req.headers.authorization != null && req.headers.authorization != '') {
				let token = req.headers.authorization;
				var decoded = jwt.verify(token, 'practice')
				if (decoded.iat < decoded.exp) {
					next();
				}
			} else {
				throw Error('token not found');
			}
		} catch (error) {
			return ResponseController.error(error, res);
		}
	}

}
module.exports = new Auth();