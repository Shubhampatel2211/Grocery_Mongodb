const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = (mongoose) => {
	const UserSchema = new Schema({
		firstname: {
			type: String,
			required: false,
			default: "",
		},
		lastname: {
			type: String,
			required: false,
			default: "",
		},
		mobileno: {
			type: Number,
			required: true,
			default: "",
		},
		device_id: {
			type: Number, //1=email,2=google,3=facebook,4=apple_id
			required: false,
			default: 0
		},
		email: {
			type: String,
			required: false,
			default: "",

		},
		authtoken: {
			type: String,
			required: false,
			default: "",
		},
		status: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 1,
		},
		otp: {
			type: Number, //1=email,2=google,3=facebook,4=apple_id
			required: false,
		},
		isregisterd: {
			type: Boolean,
			required: false,
			default: 0
		}
	}, {
		timestamps: true
	});

	return mongoose.model('User', UserSchema, 'users')
};
