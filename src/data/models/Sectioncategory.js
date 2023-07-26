const mongoose = require('mongoose');
const { Schema } = mongoose;
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		section_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Section'
		},
		category_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Category'
		},
		offer: {
			type: Number,
			required: false,
			default: "",
		},
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})

	return mongoose.model('Sectioncategory', deviceSchema, 'sectioncategory')
}