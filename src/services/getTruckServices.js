const pool = require('..config/db');

async function getTrucks (source, destination, tripdate) {
    // this function uses uses sql queries to get trucks
    // that are available for the given trip

    const query = {
        name: 'Fetch trucks',
        text: `SELECT truck_no FROM "SUT".truck_details WHERE
        source=1$ and destination=2$ and start_date=3$`,
        values: [ source, destination, tripdate ],
    };

    try {
        const result = await pool.query(query);

        console.log(result);

        return result;
    } catch (error) {
        console.error(error);

        return error;
    }
}

module.exports = getTrucks;
