const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');
const { DATE } = require('sequelize');
var ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		price: {
			type: Number,
			required: false,
		},
		discount_price: {
			type: Number,
			required: false,
		},
		quantity: {
			type: Schema.Types.Number,
		},
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		order_id: {
			type: Schema.Types.ObjectId,
			ref: 'Orders',
		},
		// orderitem_id: {
		//     type: Schema.Types.ObjectId,
		//     required: true,
		//     unique: true,
		//     default: new ObjectId(),
		// },
	}, {
		timestamps: true,

	})

	return mongoose.model('Orderitem', deviceSchema, 'orderitem')
}