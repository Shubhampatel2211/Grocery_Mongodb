const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;
module.exports = (mongoose) => {
	const addressSchema = new Schema({
		address_id: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			default: new ObjectId()
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		type: {
			type: Schema.Types.Number,
		},
		housedetail: {
			type: Schema.Types.String,
		},
		landmark: {
			type: Schema.Types.String,
		},
		reciepant_name: {
			type: Schema.Types.String,
		},
	}, {
		timestamps: true,
	})
	return mongoose.model('Address', addressSchema, 'address')
}