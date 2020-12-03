const bcrypt = require('Bcrypt');

const encryptPassword = password => {
    const saltRound = 10;
    const salt = bcrypt.genSalt(saltRound);

    const encryptedPassword = bcrypt.hash(password, salt);

    return encryptedPassword;
};

module.exports = encryptPassword;
