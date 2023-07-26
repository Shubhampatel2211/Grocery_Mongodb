const promise = require('bluebird');
const Joi = require('joi');
class Validator {

	async admin_loginvalidation(body) {
		try {
			const joiSchema = Joi.object({
				email: Joi.string().min(8).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
				password: Joi.string().required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async changepasswordvalidation(body) {
		try {
			const joiSchema = Joi.object({
				old_password: Joi.string().required(),
				new_password: Joi.string().required(),
				confirm_newpassword: Joi.string().required()
					.messages({
						'string.old_password': `please enter correct email`,
						'string.new_password': `firstname must be string`,
						'string.confirm_newpassword': `lastname must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addbrandvalidation(body) {
		try {
			const joiSchema = Joi.object({
				image: Joi.string().optional(),
				category_id: Joi.required(),
				subcategory_id: Joi.required(),
				name: Joi.string().required()
					.messages({
						'string.name': `name must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addcategoryvalidation(body) {
		try {
			const joiSchema = Joi.object({
				image: Joi.string().optional(),
				categoryname: Joi.string().required()
					.messages({
						'string.categoryname': `name must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addsubcategoryvalidation(body) {
		try {
			const joiSchema = Joi.object({
				image: Joi.string().optional(),
				category_id: Joi.required(),
				name: Joi.string().required()
					.messages({
						'string.name': `name must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addcoupenvalidation(body) {
		try {
			const joiSchema = Joi.object({
				startdate: Joi.required(),
				enddate: Joi.required(),
				discountprice: Joi.required(),
				minpurchase: Joi.required(),
				coupencode: Joi.required(),
				coupenname: Joi.string().required()
					.messages({
						'string.coupenname': `name must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async add_sectionslidervalidation(body) {
		try {
			const joiSchema = Joi.object({
				image: Joi.string().optional(),
				category_id: Joi.required(),
				section_id: Joi.required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async add_sectioncategoryvalidation(body) {
		try {
			const joiSchema = Joi.object({
				offer: Joi.optional(),
				category_id: Joi.required(),
				section_id: Joi.required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async add_sectionproductvalidation(body) {
		try {
			const joiSchema = Joi.object({
				product_id: Joi.required(),
				section_id: Joi.required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async add_sectionbrandvalidation(body) {
		try {
			const joiSchema = Joi.object({
				brand_id: Joi.required(),
				section_id: Joi.required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addproductvalidation(body) {
		try {
			const joiSchema = Joi.object({
				image: Joi.optional(),
				category_id: Joi.required(),
				subcategory_id: Joi.required(),
				brand_id: Joi.required(),
				variation: Joi.string().required(),
				short_description: Joi.string().optional(),
				description: Joi.string().optional(),
				product_name: Joi.string().required()
					.messages({
						'string.product_name': `name must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

}
module.exports = new Validator();