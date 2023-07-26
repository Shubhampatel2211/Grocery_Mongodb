const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;

function image(image) {
	return "http://localhost:4000/uploads/" + image
}

module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		subcategory_id: {
			type: Schema.Types.ObjectId,
			required: true,
			//unique: true,
			default: new ObjectId()
		},
		image: {
			type: String,
			required: false,
			default: "",
			get: image
		},
		name: {
			type: String,
			required: false,
			default: "",
		},
		status: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 1,
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})
	//deviceSchema.set('toObject',{getters:true})
	deviceSchema.set('toJSON', { getters: true })
	return mongoose.model('SubCategory', deviceSchema, 'subcategory')
}