const { getCustomer } = require('../services/customerServices');

const sendSMS = async (req, res) => {
    const result = await getCustomer(req.body.mobileNum);

    console.log(result);


    if (!result.rowCount) {
        console.log('No user found');

        return res.json({ statusCode: 404,
            message: 'Error! User is not found.' });
    }

    console.log('customer found');

    function createOTP () {
        const digits = '0123456789';
        let OTP = '';

        for (let i = 0; i < 4; i++)
            OTP += digits[Math.floor(Math.random() * 10)];

        return OTP;
    }

    console.log(createOTP());
};

module.exports = sendSMS;
