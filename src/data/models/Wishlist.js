const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		wishlist_id: {
			type: Schema.Types.ObjectId,
			//  required: true,
			// unique: true,
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
	}, {
		timestamps: true,
	})
	return mongoose.model('Wishlist', deviceSchema, 'wishlist')
}