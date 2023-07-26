//const validator = require('../../../modules/validators/api/index')
const validator = require('../middleware/validation')
const responseHelper = require('../../admin/resources/responsecontroller');
const { User, conn, Category, AdminData, Setting } = require('../../../data/models/index')
const jwt = require('jsonwebtoken')
const promise = require('bluebird')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

class AdminService {

	async admin_login(body) {
		try {
			const { email, password } = body
			const user = await AdminData.find().where('email').equals(email)
			if (user.length > 0) {
				const data = await AdminData.find().where('password').equals(password)
				if (data.length > 0) {
					return promise.resolve(data)
				} else {
					return promise.reject({ message: "password incorrect please enter valid password" })
				}
			} else {
				return promise.reject({ message: "email incorrect please enter valid email" })
			}
		} catch (error) {
			return promise.reject(error)
		}
	}

	async changepassword(id, body) {
		try {
			const { old_password, new_password, confirm_newpassword } = body
			var data = await AdminData.find({ _id: id })
			if (data.length > 0) {
				if (data[0].password === old_password) {
					if (old_password === new_password) {
						return promise.reject({ message: "this password already in use please enter another password" })
					}
					else if (new_password === confirm_newpassword) {
						var datas = await AdminData.updateMany({ _id: id }, { $set: { password: confirm_newpassword } })
						return promise.resolve(datas)
					} else {
						return promise.reject({ message: "password conformation incorrect please enter valid password" })
					}
				} else {
					return promise.reject({ message: "please enter valid old password" })
				}
			} else {
				return promise.reject({ message: "admin not found" })
			}

		} catch (error) {
			return promise.reject(error)
		}
	}

	async forgetpassword(body) {
		try {
			const { email } = body
			var data = await AdminData.find({ email: email })
			//let testAccount = await nodemailer.createTestAccount();
			let transporter = await nodemailer.createTransport({
				service: "gmail",
				host: "smtp.gmail.com",
				port: 587,
				auth: {
					user: 'tristate.mteam@gmail.com',
					pass: "nuwuxqxjnogjuwyb"
				}
			})
			let info = await transporter.sendMail({
				from: '"shubham" <tristate.mteam@gmail.com>', // sender address
				to: "patelshubham41255@gmail.com", // list of receivers
				subject: "Demo of nodemailer email", // Subject line
				text: "this is a demo of mail sending using nodemailer", // plain text body
				html: "<b>Hello world this is a nodemailer email</b>", // html body
			})
			return promise.resolve(info)
		} catch (error) {
			return promise.reject(error)
		}
	}

	async updatesetting(body) {
		try {
			const { setting_id, freedeliveryupto, deliverycharge, tax } = body
			var data = await Setting.updateMany({ _id: setting_id }, { $set: { freedeliveryupto: freedeliveryupto, deliverycharge: deliverycharge, tax: tax } })
			return promise.resolve(data)
		} catch (error) {
			return promise.reject(error)
		}
	}

}
module.exports = new AdminService();