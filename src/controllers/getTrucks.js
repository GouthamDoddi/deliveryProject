const { getTruckServices } = require('../services/getTruckServices')

module.exports.getTrucks = async (req, res) => {
    // using the data givin we need to find trucks
    // thats can travel between user's location,
    // destination and during the given data.
    const [ userPhoneNo, destination, tripData ] = req;

    try {
        const trucks = await getTruckServices(userPhoneNo, destination, tripData);

        return trucks;
    } catch (error) {
        console.log(error);

        return res.json({
            status: 401,
            message: "Couldn't find any trucks",
        });
    }
};
