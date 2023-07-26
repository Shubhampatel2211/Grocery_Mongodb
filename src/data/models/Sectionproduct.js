const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		section_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Section'
		},
		product_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Product'
		},
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})

	return mongoose.model('Sectionproduct', deviceSchema, 'sectionproduct')
}