const express = require('express');
const router = express.Router();
const { getTrucks } = require('../controllers/getTrucks');
const customerRegister = require('../controllers/customerRegistration');
const tripRegister = require('../controllers/tripRegistration');
const truckOwnerRegister = require('../controllers/truckownerRegistration');


router.get('/get_trucks', getTrucks);
router.post('/customerregister', customerRegister);
router.post('/tripRegister', tripRegister);
router.post('/truckOwnerRegister', truckOwnerRegister);

module.exports = router;
