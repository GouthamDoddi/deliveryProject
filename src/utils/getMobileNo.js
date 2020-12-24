const verifyJWT = require('../middleware/verifyJWT');

const getMobileNumber = async authHeader => {
    // using jwt let's get  the user's mobile no

    const token = authHeader && authHeader.split(' ')[1];

    const result = await verifyJWT(token);

    // console.log(result[1].sub);

    return result[1].sub;
};

module.exports = getMobileNumber;
