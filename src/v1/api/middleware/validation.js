const promise = require('bluebird');
const Joi = require('joi');
class Validator {
	async sendOtpValidation(body) {
		try {
			const joiSchema = Joi.object({
				mobileno: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
					'string.length': `mobilenumber must be 10 digit `,
					'string.empty': `phone number is cannot be an empty field`
				})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async loginValidation(body) {
		try {
			const joiSchema = Joi.object({
				mobileno: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
					'string.length': `mobilenumber must be 10 digit`,
					'string.pattern': `mobilenumber must be digit`
				}),
				otp: Joi.required()
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async registervalidation(body) {
		try {
			const joiSchema = Joi.object({
				firstname: Joi.string(),
				lastname: Joi.string(),
				address: Joi.string(),
				email: Joi.string().min(8).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
					.messages({
						'string.email': `please enter correct email`,
						'string.firstname': `firstname must be string`,
						'string.lastname': `lastname must be string`
					})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async productidValidation(body) {
		try {
			const joiSchema = Joi.object({
				id: Joi.required().messages({
					'string.empty': `id is cannot be an empty field`
				})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async cartValidation(body) {
		try {
			const joiSchema = Joi.object({
				productid: Joi.required(),
				quantity: Joi.number().min(1).required().messages({
					'string.empty': `id is cannot be an empty field`
				})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addressidvalidation(body) {
		try {
			const joiSchema = Joi.object({
				address_id: Joi.required().messages({
					'string.empty': `id is cannot be an empty field`
				})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async addressvalidation(body) {
		try {
			const joiSchema = Joi.object({
				type: Joi.required(),
				housedetail: Joi.string(),
				landmark: Joi.string(),
				reciepant_name: Joi.required()
					.messages({
						'string.reciepant_name': `reciepant_name must be string `,
						'string.housedetail': `housedetail must be string`,
						'string.landmark': `landmark must be string`
					})
			});

			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async checkout(body) {
		try {
			const joiSchema = Joi.object({
				coupen_id: Joi.required(),
				address_id: Joi.required().messages({
					'string.empty': `type is cannot be an empty field`
				})
			});
			return await joiSchema.validateAsync(body);
		} catch (e) {
			let error = { message: e.details ? e.details[0].message : e.message, code: 400 };
			console.log(e);
			return promise.reject(error);
		}
	}

	async orderdetails(body) {
		try {
			const joiSchema = Joi.object({
				order_id: Joi.required().messages({
					'string.empty': `order_id is cannot be an empty field`
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