const express = require('express');
const router = express.Router();
const { getTrucks } = require('../controllers/getTrucks');
const registerCoustmer = require('../services/addCustomer.service');


router.get('/get_trucks', getTrucks);
router.post('/customerregister', registerCoustmer);

module.exports = router;
