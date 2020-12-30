const express = require('express');
const multer = require('multer');

const router = express.Router();
const formDataHandler = multer();


const getTrucks = require('../controllers/getTrucks');
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
const transportCompanyRegister = require('../controllers/transportCompanyRegistration');
const getTrip = require('../controllers/getTrips');
const { updateTrip, incrementDeliveredPackages, incrementTotalPackages } = require('../controllers/updateTrip');
const updatePackageMaping = require('../controllers/updatePackageMapping');
const getTruckRating = require('../controllers/getTruckRating');
const addRating = require('../controllers/addRating');


router.post('/customerRegister', customerRegister);
router.post('/addTrip', verifyToken, tripRegister);
router.post('/truckownerRegister', truckOwnerRegister);
router.post('/customerlogin', customerLogin);
router.post('/truckownerLogin', truckOwnerLogin);
router.post('/addPackage', verifyToken, packageRegister);
router.post('/truckRegister', verifyToken, formDataHandler.array('document', 2), truckRegister);
router.post('/assignPackage', verifyToken, assignPackage);
router.post('/getAvailableSpace', verifyToken, getAvailableSpaceAndWeight);
router.post('/SMSLogin', sendSMS);
router.post('/transportCompanyRegister', transportCompanyRegister);
router.post('/getTruck', verifyToken, getTrucks);
router.post('/getTrip', verifyToken, getTrip);
router.post('/updateTrip', verifyToken, updateTrip);
router.post('/updatePackageMapping', verifyToken, updatePackageMaping);
router.post('/incrementDeliveredPackages', verifyToken, incrementDeliveredPackages);
router.post('/incrementTotalPackages', verifyToken, incrementTotalPackages);
router.post('/addRating', verifyToken, addRating);
router.post('/getTruckRating', verifyToken, getTruckRating);


// router.post('/verifyJWT', verifyToken);

module.exports = router;
