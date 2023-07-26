const express = require('express');
const router = express.Router();
const path = require('path');
const { dirname } = require('path');

global.base_path = dirname(require.main.filename)


/* GET users listing. */
router.get('/', (req, res) => {
	res.json({ message: { message: 'respond with a resource' }, status: 200, error: false });
});

const v1new = require('../src/v1/api/routes/user');
router.use('/api/v1', v1new);

const v1admin = require('../src/v1/admin/routes/user');
router.use('/admin/v1', v1admin);

module.exports = router;
