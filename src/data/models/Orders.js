const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');
const { DATE } = require('sequelize');
var ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		paymenttype: {
			type: String,
			required: false,
		},
		grandtotal: {
			type: Number,
			required: false,
		},
		delivery_charge: {
			type: String,
			required: false,
		},
		subtotal: {
			type: Number,
			required: false,
		},
		status: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 1,
		},

		order_date: {
			type: Date, // 0=inactive,1=active
			required: false,
			default: Date.now,
		},
		coupen_id: {
			type: Schema.Types.ObjectId,
			ref: 'Coupen',

		},
		address_id: {
			type: Schema.Types.ObjectId,
			ref: 'Address',

		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		// order_id: {
		//     type: Schema.Types.ObjectId,
		//     required: true,
		//     unique: true,
		//     default: new ObjectId(),
		//     //ref:'Wishlist'
		// },
	}, {
		timestamps: true,

	})

	return mongoose.model('Orders', deviceSchema, 'orders')
}