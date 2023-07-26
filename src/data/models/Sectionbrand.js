const mongoose = require('mongoose');
const { Schema } = mongoose;
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		section_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Section'
		},
		brand_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Brand'
		}
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})

	return mongoose.model('Sectionbrand', deviceSchema, 'sectionbrand')
}