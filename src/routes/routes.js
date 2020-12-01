const express = require('express');
const router = express.Router();
const getTruck = require('../controllers/getTruck');
const { registerCoustmer } = require('../controllers/addCutomer');


router.get('/get_trucks', getTruck);
router.post('/customerregister', registerCoustmer);

module.exports = router;
