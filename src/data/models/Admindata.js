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
		password: {
			type: String,
			required: true,
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
	}, {
		timestamps: true
	});
	return mongoose.model('AdminData', UserSchema, 'admindata')
};
