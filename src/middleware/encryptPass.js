const bcrypt = require('bcrypt');

function encryptPassword (password) {
    const encryptedPassword = bcrypt.hash(password, 10)
        .then(hash => hash,
            error => {
                console.log(error);

                return false;
            });

    return encryptedPassword;
}

module.exports = encryptPassword;
