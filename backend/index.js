require('dotenv').config();
const express = require('express');
const cors = require('cors');
const databaseConnection = require('./database/db');
const seeder = require('./database/seeder');
const apiRoute = require('./routes')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const mongoConnection = async () => {
    try {
        const connect = await databaseConnection(process.env.MONGODB_CONNECTION_STRING);
        app.listen(PORT, () => { console.log(`Server connected at port ${PORT}`) })

        console.log("Mongodb connected: " + connect.connection.host);
    } catch (error) {
        console.log(error)
    }
}


app.use("/", seeder);
app.use("/api/", apiRoute);

mongoConnection();