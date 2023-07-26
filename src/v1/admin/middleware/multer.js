const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		return cb(null, "./uploads")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname)
	},
})

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		var allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb({
				success: false,
				message: 'Invalid file type. Only jpg, png ,jpeg image files are allowed.'
			}, false);
		}
		console.log("file.mimetype============>", file.mimetype)
	}
});

module.exports = upload