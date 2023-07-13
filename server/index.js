const express = require("express");
const {connection} = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
require('dotenv').config();
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())


app.use(userRouter)

const PORT = process.env.port || 3001;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});