const mongoose = require('mongoose');

const databaseConnection = (mongodb_connection_string) => {
    return mongoose.connect(mongodb_connection_string, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
}

module.exports = databaseConnection;