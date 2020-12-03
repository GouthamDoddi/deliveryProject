const encryptPassword = require('../middleware/encryptPass');
const checkTruckowner = require('../services/truckownerServices');
const insertTruckowner = require('../services/truckownerServices');


const truckownerRegister = async (req, res) => {
    console.log('check req', req.body);
    const { firstName, lastName, mobileNum, password, email,
        isKycEnabled, aadharNo, panNo, addressline1, addressline2, city, state } = req.body;

    const result = await checkTruckowner(mobileNum);

    console.log(result);
    if (result) {
        const encryptedPassword = encryptPassword(password);

        const truckownerDetails = {
            firstName,
            lastName,
            mobileNum,
            encryptedPassword,
            email,
            isKycEnabled,
            aadharNo,
            panNo,
            addressline1,
            addressline2,
            city,
            state,
        };

        const addTruckowner = await insertTruckowner(truckownerDetails);

        res.json({ addTruckowner });


        // const token = jwtCustomer(newUser.rows[0].customer_id);


        // return res.json({ msg: 'registration sucess', customer_details: newUser.rows[0], jwt: token }); // user details + token
    }
    console.error('truckowner with that number already exists');
    res.status(409).send('User with the mobile number already registered.');
};

module.exports = truckownerRegister;
