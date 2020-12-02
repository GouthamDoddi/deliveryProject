const encryptPassword = require('../middleware/encryptPass');
const checkCustomer = require('../services/customerServices');
const insertCustomer = require('../services/customerServices');


const customerRegister = async (req, res) => {
    console.log('check req', req.body);
    const { firstName, lastName, mobileNum, password, email,
        isKycEnabled, aadharNo, panNo, addressline1, addressline2, city, state } = req.body;

    const result = checkCustomer(mobileNum);

    console.log(result);
    if (result) {
        const encryptedPassword = encryptPassword(password);

        const customerDetails = {
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

        const addCustomer = await insertCustomer(customerDetails);

        res.json({ addCustomer });


        // const token = jwtCustomer(newUser.rows[0].customer_id);


        // return res.json({ msg: 'registration sucess', customer_details: newUser.rows[0], jwt: token }); // user details + token
    }
    console.error('Customer with that number already exists');
    res.status(409).send('User with the mobile number already registered.');
};

module.exports = customerRegister;
