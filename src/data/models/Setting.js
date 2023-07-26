const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');
var ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

module.exports = (mongoose) => {
	const deviceSchema = new Schema({

		freedeliveryupto: {
			type: Number,
			required: false,
			default: "",
		},
		deliverycharge: {
			type: Number,
			required: false,
			default: "",
		},
		tax: {
			type: Number,
			required: false,
			default: "",
		},
		setting_id: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			default: new ObjectId()

		},

	}, {
		timestamps: true,

	})

	return mongoose.model('Setting', deviceSchema, 'setting')
}