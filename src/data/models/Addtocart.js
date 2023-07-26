const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;
module.exports = (mongoose) => {
	const addtocartSchema = new Schema({
		cart_id: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			default: new ObjectId()
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',

		},
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		quantity: {
			type: Schema.Types.Number,
			default: 1
		}
	}, {
		timestamps: true,
	})
	return mongoose.model('Addtocart', addtocartSchema, 'addtocart')
}