const mongoose = require('mongoose');
const { Schema } = mongoose;

// function image(image){
//     return "http://localhost:4000/uploads/" + image
// }
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		section_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Section'
		},
		image: {
			type: String,
			required: false,
			default: "",
			// get:image
		},
		category_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Category'
		},
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})
	deviceSchema.set('toJSON', { getters: true })
	return mongoose.model('Sectionslider', deviceSchema, 'sectionslider')
}