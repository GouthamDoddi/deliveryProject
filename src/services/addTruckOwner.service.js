const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwtTruckowner = require('../utils/jwtTruckowner');


router.post('/truckregister', async (req, res) => {
    try {
        const { truckowner_name, last_name, mobile_num, password, email, is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state } = req.body;

        const user = await pool.query('SELECT * FROM truckowner WHERE mobile_num = $1', [ mobile_num ]);


        if (user.rows.length !== 0)
            return res.status(401).send('USER EXISTS- TRY LOGIN WITH MOBILE NUMBER');


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO truckowner (truckowner_name, last_name, mobile_num, password, email, is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [ truckowner_name, last_name, mobile_num, bcryptPassword, email, is_kyc_enabled, aadhar_no, pan_no, addressline1, addressline2, city, state ]);

        const token = jwtTruckowner(newUser.rows[0].truckowner_id);


        res.json({ msg: 'registration sucess', truckowner_details: newUser.rows[0], jwt: token }); // user details + token
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
