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

		product_name: {
			type: String,
			required: false,
			default: "",
		},
		description: {
			type: String,
			required: false

		},
		short_description: {
			type: String,
			required: false,

		},
		variation: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: false,
		},
		discount: {
			type: Number,
			required: false,
		},
		discount_price: {
			type: Number,
			required: false,
		},
		flag: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 0,
		},

		stock: {
			type: Boolean, // 0=inactive,1=active
			required: false,
			default: 1,
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: 'Category',

		},
		subcategory_id: {
			type: Schema.Types.ObjectId,
			ref: 'SubCategory',

		},
		brand_id: {
			type: Schema.Types.ObjectId,
			ref: 'Brand',

		},
		product_id: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			default: new ObjectId(),
			ref: 'Wishlist'
		},
		// fk_user_id: {
		//     type:Schema.Types.ObjectId,
		//     ref: 'Users'
		// },
	}, {
		timestamps: true,
		id: false,
		versionKey: false
	})
	deviceSchema.set('toJSON', { getters: true })
	return mongoose.model('Product', deviceSchema, 'product')
}