const express = require('express');
const router = express.Router();
// const { getTrucks } = require('../controllers/getTrucks');
const customerRegister = require('../controllers/customerRegistration');
const tripRegister = require('../controllers/tripRegistration');
const truckOwnerRegister = require('../controllers/truckownerRegistration');
const customerLogin = require('../controllers/customerLogin');
const packageRegister = require('../controllers/packageRegistration');
const truckRegister = require('../controllers/truckRegisteration');
const getAvailableSpaceAndWeight = require('../controllers/getAvailableSpaceAndWeight');
const assignPackage = require('../controllers/assignPackage');
const sendSMS = require('../controllers/sendSMS');
const truckOwnerLogin = require('../controllers/truckOwnerLogin');
const verifyToken = require('../controllers/verifyToken');

// router.get('/get_trucks', getTrucks);
router.post('/customerregister', customerRegister);
router.post('/addTrip', verifyToken, tripRegister);
router.post('/truckOwnerRegister', truckOwnerRegister);
router.post('/customerlogin', customerLogin);
router.post('/truckownerLogin', truckOwnerLogin);
router.post('/packageRegister', verifyToken, packageRegister);
router.post('/truckRegister', verifyToken, truckRegister);
router.post('/getAvailableSpace', verifyToken, getAvailableSpaceAndWeight);
router.post('/assignPackage', verifyToken, assignPackage);
router.post('/sendSMS', sendSMS);
// router.post('/verifyJWT', verifyToken);

module.exports = router;
