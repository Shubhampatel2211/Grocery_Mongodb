const mongoose = require('mongoose');
const { Schema } = mongoose;
var ObjectId = mongoose.Types.ObjectId;
module.exports = (mongoose) => {
	const deviceSchema = new Schema({
		section_id: {
			type: Schema.Types.ObjectId,
			required: true,
			default: new ObjectId()
		},
		section_type: {
			type: Number,
			required: false,
			default: "",
		},
		title_name: {
			type: String,
			required: false,
			default: "",
		},
		sequence: {
			type: Number,
			required: false,
			default: "",
		},
	}, {
		timestamps: true,
	})

	return mongoose.model('Section', deviceSchema, 'section')
}