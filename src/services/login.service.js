const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtCustomer = require('../utils/jwtCustomer');
const jwtTruckowner = require('../utils/jwtTruckowner');


router.post('/customerlogin', async (req, res) => {
    const { mobile_num, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM customer WHERE mobile_num = $1', [ mobile_num ]);

        if (user.rows.length === 0)
            return res.status(401).json('Invalid Credential');


        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password,
        );

        if (!validPassword)
            return res.status(401).json('login failure');

        const jwtToken = jwtCustomer(user.rows[0].user_id);

        return res.json({ msg: 'login sucess', jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/trucklogin', async (req, res) => {
    const { mobile_num, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM truckowner WHERE mobile_num = $1', [ mobile_num ]);

        if (user.rows.length === 0)
            return res.status(401).json('Invalid Credential');


        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password,
        );

        if (!validPassword)
            return res.status(401).json('login failure');

        const jwtToken = jwtTruckowner(user.rows[0].user_id);

        return res.json({ msg: 'login sucess', jwtToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
