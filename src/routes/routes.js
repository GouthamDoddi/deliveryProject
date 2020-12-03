const express = require('express');
const router = express.Router();
// const { getTrucks } = require('../controllers/getTrucks');
const customerRegister = require('../controllers/customerRegistration');
const truckownerRegister = require('../controllers/truckownerRegistration');
const tripRegister = require('../controllers/tripRegistration');


// router.get('/get_trucks', getTrucks);
router.post('/customerregister', customerRegister);
router.post('/truckownerregister', truckownerRegister);
router.post('/tripregister', tripRegister);

module.exports = router;
