const express = require('express');
const router = express.Router();
const getTruck = require('../controllers/getTruck');


router.get('/get_trucks', getTruck);
