const express = require('express');
const router = express.Router();
const pool = require('../db');


router.post('/truckdetails', async (req, res) => {
    try {
        const { truck_name, truck_no, truck_model, chasis_no, capacity_inkgs, capacity_inspace, bookedweight, bookedspace, registered_name } = req.body;

        const user = await pool.query('SELECT * FROM truckdetails WHERE truck_no = $1', [ truck_no ]);


        if (user.rows.length !== 0)
            return res.status(401).send('Truck already Exists');


        const newUser = await pool.query('INSERT INTO truckdetails (truck_name, truck_no, truck_model, chasis_no, capacity_inkgs, capacity_inspace, bookedweight, bookedspace, registered_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [ truck_name, truck_no, truck_model, chasis_no, capacity_inkgs, capacity_inspace, bookedweight, bookedspace, registered_name ]);


        res.json({ msg: 'Truck Added Success ', truck_details: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
