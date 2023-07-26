//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const ProductService = require('../services/ProductService')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, UserDeviceToken, SubCategory } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')

class ProductController {

	async addproduct(req, res) {
		try {
			await validator.addproductvalidation(req.body)
			var user = await ProductService.addproduct(req, req.body);
			return responseHelper.success(user, 'product added successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async deleteproduct(req, res) {
		try {
			var user = await ProductService.deleteproduct(req, req.body);
			return responseHelper.success(user, 'product deleted successfully', res);
		} catch (error) {
			return responseHelper.error(error, res);
		}
	}

	async updateproduct(req, res) {
		try {
			var user = await ProductService.updateproduct(req.body);
			return responseHelper.success(user, 'product updated successfully', res);
		} catch (error) {
			return responseHelper.error(error,res);
		}
	}

	async productlist(req, res) {
		try {
			var user = await ProductService.productlist();
			return responseHelper.success(user,'product fetched successfully',res);
		}catch (error) {
			return responseHelper.error(error,res);
		}
	}
    
}
module.exports = new ProductController();