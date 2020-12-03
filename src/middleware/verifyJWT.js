const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
// const express = require('express');
// const router = express.Router();

// router.post('/', (req, res) => {
//     jwt.verify(res.token.token, secret, err => {
//         if (err) {
//             return res.json(
//                 {
//                     name: 'TokenExpiredError',
//                     message: 'jwt expired',
//                     expiredAt: 1408621000,
//                 },
//             );
//         }

//         return res.json({ status: 200,
//             token: 'verified' });
//     });
// });

module.exports.verifyJWT = token => {
    jwt.verify(token, secret, err => {
        if (err) {
            console.log(err);

            return false;
        }

        return true;
    });
};
