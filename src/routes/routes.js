const express = require('express');
const router = express.Router();
// const { getTrucks } = require('../controllers/getTrucks');
const customerRegister = require('../controllers/customerRegistration');
const tripRegister = require('../controllers/tripRegistration');
const truckOwnerRegister = require('../controllers/truckownerRegistration');
const customerLogin = require('../controllers/customerLogin');
const packageRegister = require('../controllers/packageRegistration');
const truckRegister = require('../controllers/truckRegisteration');


// router.get('/get_trucks', getTrucks);
router.post('/customerregister', customerRegister);
router.post('/tripRegister', tripRegister);
router.post('/truckOwnerRegister', truckOwnerRegister);
router.post('/customerlogin', customerLogin);
router.post('/packageRegister', packageRegister);
router.post('/truckRegister', truckRegister);

module.exports = router;
