const express = require('express');
const router = express.Router();
const { getTrucks } = require('../controllers/getTrucks');
const customerRegister = require('../controllers/customerRegistration');


router.get('/get_trucks', getTrucks);
router.post('/customerregister', customerRegister);

module.exports = router;
