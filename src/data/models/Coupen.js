const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');
var ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

module.exports = (mongoose) => {
	const deviceSchema = new Schema({

		minpurchase: {
			type: Number,
			required: false,
			default: "",
		},
		discountprice: {
			type: Number,
			required: false,
			default: "",
		},
		coupencode: {
			type: String,
			required: false,
			default: "",
		},
		coupenname: {
			type: String,
			required: false,
			default: "",
		},
		status: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 1,
		},
		startdate:
		{
			type: Date,
			required: false,
			default: Date.now
		},
		enddate: {
			type: Date, // 0=inactive,1=active
			required: false,
			default: Date.now
		},
		coupen_id: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			default: new ObjectId()
			//ref:'SubCategory'
		},

	}, {
		timestamps: true,
		id: false,
		versionKey: false

	})

	return mongoose.model('Coupen', deviceSchema, 'coupen')
}