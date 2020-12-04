const { insertTruck } = require('../services/truckServices');

const truckRegister = async (req, res) => {
    const truckDetails = {
        truckName: req.body.truckName,
        truckNo: req.body.truckNo,
        truckModel: req.body.truckModel,
        chasisNo: req.body.chasisNo,
        capacityInKgs: req.body.capacityInKgs,
        capacityInSpace: req.body.capacityInSpace,
        bookedWeight: req.body.bookedWeight,
        bookedSpace: req.body.bookedSpace,
        mobileNum: req.body.mobileNum,
    };

    const result = await insertTruck(truckDetails);


    if (result.command === 'INSERT') {
        return res.json({
            statusCode: 201,
            message: 'Truck added to database',
        });
    }

    return res.json({
        statusCode: 401,
        message: "Couldn't add truck",
    });
};

module.exports = truckRegister;
