const express = require('express');
const router = express.Router();
const pool = require('../db');


router.post('/tripdetails', async (req, res) => {
    try {
        const { truck_no, source, destination, startdate, reachdate, trip_duration_in_hrs } = req.body;

        const user = await pool.query('SELECT * FROM tripdetails WHERE truck_no = $1', [ truck_no ]);


        if (user.rows.length !== 0)
            return res.status(401).send('Duplicate Trip');


        const newUser = await pool.query('INSERT INTO tripdetails (truck_no, source, destination, startdate, reachdate, trip_duration_in_hrs) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [ truck_no, source, destination, startdate, reachdate, trip_duration_in_hrs ]);


        res.json({ msg: 'Trip Added Success ', trip_details: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
