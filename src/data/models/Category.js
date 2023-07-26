const mongoose = require('mongoose');
const SubCategory = require('./SubCategory');
var ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

function image(image) {
	return "http://localhost:4000/uploads/" + image
}

module.exports = (mongoose) => {
	const deviceSchema = new Schema({

		image: {
			type: String,
			required: false,
			default: "",
			get: image
		},
		icon_image: {
			type: String,
			required: false,
			default: "",
		},
		category_name: {
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
			required: true,
			unique: true,
			default: new ObjectId()
			//ref:'SubCategory'
		},
		// fk_user_id: {
		//     type:Schema.Types.ObjectId,
		//     ref: 'Users'
		// },
	}, {
		timestamps: true,
		id: false,
		versionKey: false
		// _id : false //{ virtuals: true ,versionKey: false, id: false, timestamps: { createdAt: true, updatedAt: false } })
	})

	//deviceSchema.set('toObject',{getters:true})
	deviceSchema.set('toJSON', { getters: true })
	return mongoose.model('Category', deviceSchema, 'category')
}