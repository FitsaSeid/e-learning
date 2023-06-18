const bcrypt = require('bcrypt');

const data = {
    users: [
        {
            firstName: "bini",
            lastName: "bini",
            email: "bini@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        },
        {
            firstName: "eyob",
            lastName: "eyob",
            email: "eyob@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        },
        {
            firstName: "hana",
            lastName: "hana",
            email: "hana@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        }
    ]
}

module.exports = data